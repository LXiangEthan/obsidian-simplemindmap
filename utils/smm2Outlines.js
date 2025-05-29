/**
 * @ author ethan
 * @ date  2025年05月16日 12:28
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
// @ts-ignore
import { nodeRichTextToTextWithWrap, htmlEscape } from 'simple-mind-map/src/utils'
import { textToNodeRichTextWithWrap } from 'simple-mind-map/src/utils'
import {Notice} from "obsidian";
export const smm2outlines = (mindMap,data,contentEl,document)=>{
	data.root = true // 标记根节点
	// 遍历树，添加一些属性
	let walk = root => {
		// 如果是富文本节点，那么调用nodeRichTextToTextWithWrap方法将<p><span></span><p>形式的节点富文本内容转换成\n换行的文本
		let text = (root.data.richText
				? nodeRichTextToTextWithWrap(root.data.text)
				: root.data.text
		).replaceAll(/\n/g, '<br>')
		text = htmlEscape(text)
		text = text.replaceAll(/\n/g, '<br>')
		root.textCache = text // 保存一份修改前的数据，用于对比是否修改了
		root.label = text// 用于树组件渲染
		root.uid = root.data.uid
		if (root.children && root.children.length > 0) {
			root.children.forEach(item => {
				walk(item)
			})
		}
	}
	walk(data)


	const container = contentEl.querySelector('#smm-dg-outline');
	let editingNodeId = null;
	let draggedNode = null;
	let dropTarget = null;
	let dropPosition = null; // 'top', 'bottom', 'inside'
	// 提取文本内容从HTML
	function extractText(htmlText) {
		if (!htmlText) return '';
		if (typeof htmlText !== 'string') return String(htmlText);

		// 简单移除HTML标签
		if (htmlText.includes('<')) {
			const tmp = document.createElement('div');
			tmp.innerHTML = htmlText;
			return tmp.textContent || tmp.innerText || htmlText;
		}
		return htmlText;
	}

	// 获取节点显示文本
	function getNodeText(node) {
		return node.data.text ? extractText(node.data.text) :
			node.textCache ? node.textCache :
				node.label ? node.label : '';
	}

	// 递归渲染节点和其子节点
	function renderNode(node, level = 0, parent = null) {
		// 如果节点已折叠且不是当前渲染的节点，则跳过渲染其子节点
		if (parent && parent.data.expand === false) {
			return;
		}

		// 创建节点元素
		const nodeEl = document.createElement('div');
		nodeEl.className = `smm-dg-outline-node smm-dg-node-level-${level}`;
		nodeEl.dataset.uid = node.data.uid;
		nodeEl.draggable = true;

		// 创建拖放指示器
		const topIndicator = document.createElement('div');
		topIndicator.className = 'smm-dg-drop-indicator top';

		const bottomIndicator = document.createElement('div');
		bottomIndicator.className = 'smm-dg-drop-indicator bottom';

		const insideIndicator = document.createElement('div');
		insideIndicator.className = 'smm-dg-drop-indicator inside';

		nodeEl.appendChild(topIndicator);
		nodeEl.appendChild(bottomIndicator);
		nodeEl.appendChild(insideIndicator);

		// 创建操作按钮
		const actionsDiv = document.createElement('div');
		actionsDiv.className = 'smm-dg-node-actions';

		const addBtn = document.createElement('button');
		addBtn.className = 'smm-dg-node-btn add';
		addBtn.innerHTML = '+';
		addBtn.title = '添加子节点';
		addBtn.onclick = (e) => {
			e.stopPropagation();
			addChildNode(node);
		};

		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'smm-dg-node-btn delete';
		deleteBtn.innerHTML = '×';
		deleteBtn.title = '删除节点';
		deleteBtn.onclick = (e) => {
			e.stopPropagation();
			deleteNode(node);
		};

		actionsDiv.appendChild(addBtn);
		actionsDiv.appendChild(deleteBtn);
		nodeEl.appendChild(actionsDiv);

		// 如果当前在编辑此节点
		if (editingNodeId === node.data.uid) {
			const input = document.createElement('input');
			input.className = 'smm-dg-node-edit';
			input.value = getNodeText(node);

			input.addEventListener('keydown', e => {
				if (e.key === 'Enter') {
					saveEdit(node, input.value);
					editingNodeId = null;
					render()
				} else if (e.key === 'Escape') {
					editingNodeId = null;
					render()
				}
			});

			// 添加失焦事件
			input.addEventListener('blur', () => {
				saveEdit(node, input.value);
				editingNodeId = null;
				render()
			});

			// 自动聚焦
			setTimeout(() => {
				input.focus();
				input.select();
			}, 0);

			nodeEl.appendChild(input);
		} else {
			// 创建节点内容包装器
			const wrapper = document.createElement('div');
			wrapper.className = 'smm-dg-node-wrapper';

			// 判断是否有子节点
			const hasChildren = node.children && node.children.length > 0;

			// 添加折叠按钮或占位符
			if (hasChildren) {
				const collapseBtn = document.createElement('span');
				collapseBtn.className = `smm-dg-collapse-btn ${node.data.expand === false ? 'collapsed' : ''}`;
				collapseBtn.innerHTML = '▼';
				collapseBtn.title = node.data.expand === false ? '展开' : '折叠';

				collapseBtn.onclick = (e) => {
					e.stopPropagation();
					toggleExpand(node);
				};

				wrapper.appendChild(collapseBtn);
			} else {
				const collapseBtn = document.createElement('span');
				collapseBtn.innerHTML = '○';
				wrapper.appendChild(collapseBtn);
				const placeholder = document.createElement('span');
				placeholder.className = 'smm-dg-placeholder';
				wrapper.appendChild(placeholder);
			}

			// 显示节点文本
			const content = document.createElement('span');
			content.className = 'smm-dg-node-content';
			content.textContent = getNodeText(node);

			// 双击编辑
			content.ondblclick = e => {
				e.stopPropagation();
				editingNodeId = node.data.uid;
				render();
			};

			wrapper.appendChild(content);
			nodeEl.appendChild(wrapper);
		}

		nodeEl.addEventListener('dragstart', e => {
			nodeEl.classList.add('smm-dg-dragging');
			draggedNode = node;
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', node.data.uid); // 为兼容性设置

			// 清除其他节点的drop-target样式
			document.querySelectorAll('.smm-dg-drop-target').forEach(el => {
				if (el !== nodeEl) el.classList.remove('smm-dg-drop-target');
			});
		});

		nodeEl.addEventListener('dragend', () => {
			nodeEl.classList.remove('smm-dg-dragging');
			document.querySelectorAll('.smm-dg-drop-indicator').forEach(el => {
				el.style.display = 'none';
			});
			document.querySelectorAll('.smm-dg-drop-target').forEach(el => {
				el.classList.remove('smm-dg-drop-target');
			});
			// 被拖拽的节点
			const node = mindMap.renderer.findNodeByUid(draggedNode.data.uid)
			// 拖拽到的目标节点
			const targetNode = mindMap.renderer.findNodeByUid(dropTarget.data.uid)
			if(targetNode.getAncestorNodes().contains(node)){
				new Notice('祖先节点不能推给孩子节点')
				return
			}

			if(dropPosition == 'inside') {
				mindMap.execCommand('MOVE_NODE_TO', node, targetNode)
			}
			else if (dropPosition == 'bottom') {
				if(targetNode.isRoot){
					new Notice('根结点无法作为兄弟节点')
					return
				}
				mindMap.execCommand('INSERT_AFTER', node, targetNode)

			}
			else if (dropPosition == 'top') {
				if(targetNode.isRoot){
					new Notice('根结点无法作为兄弟节点')
					return
				}
				mindMap.execCommand('INSERT_BEFORE', node, targetNode)
			}
			// 不立即清除状态，让drop事件可以获取
			setTimeout(() => {
				draggedNode = null;
				dropTarget = null;
				dropPosition = null;
			}, 10);
		});

		nodeEl.addEventListener('dragover', e => {
			e.preventDefault();
			if (!draggedNode || draggedNode.data.uid === node.data.uid) return;

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			dropTarget = node;

			// 隐藏所有指示器
			nodeEl.querySelectorAll('.smm-dg-drop-indicator').forEach(el => {
				el.style.display = 'none';
			});

			// 移除高亮，使用指示器代替
			document.querySelectorAll('.smm-dg-drop-target').forEach(el => {
				el.classList.remove('smm-dg-drop-target');
			});

			const rect = nodeEl.getBoundingClientRect();
			const y = e.clientY - rect.top;

			// 确定拖放区域
			if (y < rect.height * 0.25) {
				// 顶部区域：放在目标节点上方
				topIndicator.style.display = 'block';
				dropPosition = 'top';
			}
			else if (y > rect.height * 0.75) {
				// 底部区域：放在目标节点下方
				bottomIndicator.style.display = 'block';
				dropPosition = 'bottom';
			}
			else {
				// 中间区域：放在目标节点内部
				insideIndicator.style.display = 'block';
				nodeEl.classList.add('smm-dg-drop-target');
				dropPosition = 'inside';
			}

			// 阻止冒泡以避免闪烁
			e.stopPropagation();
		});

		nodeEl.addEventListener('drop', e => {
			e.preventDefault();
			e.stopPropagation();

			if (!draggedNode || draggedNode.data.uid === node.data.uid) return;
		});
		nodeEl.addEventListener('dragleave', (e) => {
			// 确保真正离开了节点才移除样式（防止子元素触发）
			// 检查鼠标是否真的离开了元素
			const rect = nodeEl.getBoundingClientRect();
			if (
				e.clientX < rect.left ||
				e.clientX >= rect.right ||
				e.clientY < rect.top ||
				e.clientY >= rect.bottom
			) {
				nodeEl.querySelectorAll('.smm-dg-drop-indicator').forEach(el => {
					el.style.display = 'none';
				});
			}
		});
		// 将节点添加到容器
		container.appendChild(nodeEl);

		// 递归渲染子节点，只有当节点展开时才渲染
		if (node.children && node.children.length && node.data.expand !== false) {
			node.children.forEach(child => renderNode(child, level + 1, node));
		}
	}

	// 递归查找节点信息
	function findNodeInfo(tree, uid, parent = null, index = -1) {
		if (tree.data && tree.data.uid === uid) {
			return { node: tree, parent, index };
		}

		if (tree.children && tree.children.length) {
			for (let i = 0; i < tree.children.length; i++) {
				if (tree.children[i].data.uid === uid) {
					return { node: tree.children[i], parent: tree, index: i };
				}

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const found = findNodeInfo(tree.children[i], uid, tree.children[i], -1);
				if (found.node) return found;
			}
		}

		return { node: null, parent: null, index: -1 };
	}

	// 保存编辑
	function saveEdit(node, newText) {
		const richText = node.data.richText
		const targetNode = mindMap.renderer.findNodeByUid(node.data.uid)
		if (!targetNode) return
		if (richText) {
			targetNode.setText(textToNodeRichTextWithWrap(newText), true, true)
		} else {
			targetNode.setText(newText)
		}
	}

	// 完整渲染
	function render() {
		container.innerHTML = '';
		renderNode(data);
		for(const onode of contentEl.querySelectorAll('.smm-dg-outline-node')){
			const uid = onode.getAttribute('data-uid');
			onode.onclick = ()=>{
				const targetNode = mindMap.renderer.findNodeByUid(uid)
				// 如果当前已经是激活状态，那么上面都不做
				if (targetNode && targetNode.nodeData.data.isActive) return
				// 定位到目标节点
				mindMap.execCommand('GO_TARGET_NODE', uid)
			}
		}
	}

	// 初始渲染
	render();

	// 添加子节点
	function addChildNode(parentNode) {
		const uid = parentNode.data.uid
		const node = mindMap.renderer.findNodeByUid(uid)
		mindMap.execCommand('INSERT_CHILD_NODE',false,node)
	}

	// 删除节点
	function deleteNode(node) {
		const anode = mindMap.renderer.findNodeByUid(node.data.uid)
		mindMap.execCommand('REMOVE_NODE', [anode])
	}

	// 切换节点展开/折叠状态
	function toggleExpand(node) {
		node.data.expand = !node.data.expand;

		// 触发事件
		document.dispatchEvent(new CustomEvent('node-toggle-expand', {
			detail: {
				uid: node.data.uid,
				expand: node.data.expand
			}
		}));

		render();
	}

}
