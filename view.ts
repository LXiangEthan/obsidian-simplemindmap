
import {Notice, TextFileView, TFile} from "obsidian";
import MindMap from "simple-mind-map";
// @ts-ignore
import Drag from 'simple-mind-map/src/plugins/Drag.js'
// @ts-ignore
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
// @ts-ignore
import Select from 'simple-mind-map/src/plugins/Select.js'
// @ts-ignore
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
// @ts-ignore
import Themes from 'simple-mind-map-plugin-themes'

// @ts-ignore
import Export from 'simple-mind-map/src/plugins/Export.js'

// @ts-ignore
import OuterFrame from 'simple-mind-map/src/plugins/OuterFrame.js'

// @ts-ignore
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import {smm_panel} from "./renders/panel";
// @ts-ignore
import {buttons} from "./renders/buttons";

// @ts-ignore
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
// @ts-ignore
import { nodeIconList } from 'renders/icon'
// @ts-ignore
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'



MindMap.usePlugin(TouchEvent)
MindMap.usePlugin(OuterFrame)
MindMap.usePlugin(Drag)
MindMap.usePlugin(KeyboardNavigation)
MindMap.usePlugin(Select)
Themes.init(MindMap)
MindMap.usePlugin(AssociativeLine)
MindMap.usePlugin(Export)
MindMap.usePlugin(MiniMap)
MindMap.usePlugin(NodeImgAdjust)
// @ts-ignore
export const VIEW_TYPE_SMM = "smm-view";

export class SMMView extends TextFileView {
	private mindMap : any
	private miap: any;
	private viap: any;
	private smm_mindmap: HTMLDivElement;
	private viewBoxStyle: any;
	private currentFile: any;
	getViewData() {
		return this.data;
	}

	setViewData(data: string) {

		if(this.mindMap){
			this.mindMap.destroy();
			this.mindMap = null;
		}
		this.contentEl.empty()
			this.data = data;
			this.contentEl.createEl('div', {attr: {class: 'smm-window-leaf'}, text: ''});
			const roots = this.contentEl.querySelector(".smm-window-leaf")
			// @ts-ignore
			roots.setAttribute('width', '100%');
			// @ts-ignore
			roots.setAttribute('height', '100%');

			this.smm_mindmap = document.createElement('div')
			this.smm_mindmap.setAttribute('class', 'ob-simple-mindMapContainer');
			this.smm_mindmap.setAttribute('width', '100%');
			this.smm_mindmap.setAttribute('height', '100%');
			this.setSetting(roots);
			// @ts-ignore
			roots.appendChild(this.smm_mindmap);
			const myMinimap = document.createElement('div')
			myMinimap.setAttribute('class', 'miniMapContainer');
			this.smm_mindmap.appendChild(myMinimap);
			myMinimap.style.display = 'none';
			const myMinimapborder = document.createElement('div')
			myMinimapborder.setAttribute('class', 'viewBoxContainer');
			this.smm_mindmap.appendChild(myMinimapborder);
		myMinimapborder.style.display = 'none'
		// @ts-ignore
		this.contentEl.querySelector("#smm-panel").style.display = 'none';
			const newData = JSON.parse(data)
		// @ts-ignore
		const { root, layout, theme, view } = newData
			// @ts-ignore
		this.mindMap = new MindMap({
			el: this.contentEl.querySelector(".ob-simple-mindMapContainer"),
			data: root,
			layout: layout,
			theme: theme.template,
			themeConfig: theme.config,
			viewData: view,
		})
		this.registerEvent(
			this.app.workspace.on('active-leaf-change', (leaf) => {
				this.currentFile = this.app.workspace.getActiveFile()
			})
		);
		// @ts-ignore
		this.contentEl.querySelector("#smm-add").onclick = ()=>{
			this.mindMap.execCommand("INSERT_CHILD_NODE")
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-delete").onclick = ()=>{
			this.mindMap.execCommand("REMOVE_NODE")
		}
		setTimeout(async ()=>{
		this.addEventWithButton()
		await this.saveDataIntoFile()
	},800)
	}
	async saveDataIntoFile(){
		const thisNode = this.mindMap.renderer.textEdit.getCurrentEditNode()?this.mindMap.renderer.textEdit.getCurrentEditNode():null
			// @ts-ignore
			const content = await this.mindMap.getData(true)
			const svgObj = await this.mindMap.export('svg', false, '')
			content.svgData = svgObj
		if(thisNode) {
			this.mindMap.renderer.textEdit.show({node: thisNode})
		}
			if (this.currentFile instanceof TFile && this.currentFile.extension == "smm") {
				// @ts-ignore
				this.app.vault.off('modify');
				await this.app.vault.modify(this.currentFile, JSON.stringify(content));
				console.log("保存成功");
				// @ts-ignore
				this.app.vault.on('modify');
			}
	}
	addEventWithButton(){
		this.mindMap.on("view_data_change",async ()=>{
			this.renderMinimap()
		})

		this.mindMap.on("data_change",async ()=>{
				await this.saveDataIntoFile()
				this.renderMinimap()

		})
		this.miap = this.contentEl.querySelector(".miniMapContainer")
		this.viap = this.contentEl.querySelector(".viewBoxContainer")
		this.miap.style.display = "none"
		this.viap.style.display = 'none'
			// @ts-ignore
		this.contentEl.querySelector("#createAssociativeLine").onclick = async () => {
				try {
					this.mindMap.associativeLine.createLineFromActiveNode()
				} catch {
					new Notice("请选择节点，概要无法链接")
				}
			}
			// @ts-ignore
		this.contentEl.querySelector("#smm-addOutLine").onclick = async () => {
				try {
					this.mindMap.execCommand('ADD_OUTER_FRAME', [], {})
				} catch {
					new Notice("外框添加失败")
				}
			}
			// @ts-ignore
		this.contentEl.querySelector("#smm-GENERALIZATION").onclick = async ()=>{
				this.mindMap.execCommand('ADD_GENERALIZATION',{text:'概要'},true)
			}
			// @ts-ignore
		this.contentEl.querySelector("#smm-showMap").onclick = () => {
				try {
					if(this.miap.style.display == "none"){
						this.miap.removeAttribute('style')
						this.viap.removeAttribute('style')
						this.renderMinimap()
					}else {
						this.miap.style.display = 'none'
						this.viap.style.display = 'none'
					}
				} catch {
					new Notice("外框添加失败")
				}
			}

		// @ts-ignore
		this.contentEl.querySelector("#smm-panel-button").onclick = ()=>{
			const panel = this.contentEl.querySelector("#smm-panel")
			try {
				// @ts-ignore
				if(panel.style.display == "none"){
					// @ts-ignore
					panel.removeAttribute('style')
				}else {
					// @ts-ignore
					panel.style.display = 'none'
				}
			} catch {
				new Notice("控制面板打开失败")
			}

		}

		this.mindMap.on('node_active', (node: any) => {
			// @ts-ignore
			const current_node = node;
			// @ts-ignore
			this.contentEl.querySelector("#smm-setnote").onclick = ()=>{
				// @ts-ignore
				this.contentEl.querySelector("#smm-card").removeAttribute("style")
				const pre_note = node.getData('note')
				// @ts-ignore
				this.contentEl.querySelector("#smm-textarea").value = pre_note!==undefined?pre_note:""
				// @ts-ignore
				this.contentEl.querySelector("#smm-inputNote").onclick = ()=>{
					// @ts-ignore
					const textarrea_note = this.contentEl.querySelector("#smm-textarea")
					// @ts-ignore
					const text = textarrea_note.value
					// eslint-disable-next-line no-constant-condition
					// 	if(text != ""){
							this.mindMap.execCommand('SET_NODE_NOTE',current_node,text)
							// @ts-ignore
							textarrea_note.value = ""
							// @ts-ignore
							this.contentEl.querySelector("#smm-card").style.display = "none"
						// }else{
						//
						// }

				}
				// @ts-ignore
				this.contentEl.querySelector("#smm-close-note").onclick = ()=>{
					// @ts-ignore
					this.contentEl.querySelector("#smm-card").style.display = "none"
				}
			}
		})

		this.app.workspace.on("resize",()=>{
			this.mindMap.resize()
		})
		this.renderTheme()
		this.pasteImage()
		this.insertLink()
		// setIcon中有循环操作需要放在最后，否则可能会影响后面的性能
		this.setIcon()
	}
	renderMinimap(){
		// @ts-ignore
		if (this.miap.style.display == "none"){
			console.log("执行了，没有渲染")
			return
		}
		const miniObj = this.mindMap.miniMap.calculationMiniMap("180px","90px")
		this.viewBoxStyle = miniObj.viewBoxStyle
		// @ts-ignore
		miniObj.getImgUrl((miniimage)=>{
			// @ts-ignore
			this.miap.innerHTML = `<img src="${miniimage}" width="100%" height="100%" draggable="false"></img>`
			// @ts-ignore
			this.miap.style.transform =  `scale(${miniObj.miniMapBoxScale})`
			// @ts-ignore
			this.miap.style.left = miniObj.miniMapBoxLeft + 'px'
			// @ts-ignore
			this.miap.style.right = miniObj.miniMapBoxRight + 'px'
		})
	}
	clear() {
		console.log("清理一次")
		this.data = '';
		if(this.mindMap){
			this.mindMap.destroy();
			this.mindMap = null;
		}
		this.contentEl.empty();
	}
	getViewType() {
		return VIEW_TYPE_SMM;
	}
	async onOpen() {
		console.log("文件打开")
	}
	async onClose() {
		console.log("关闭文件")
		if(this.mindMap){
			this.mindMap.destroy();
			this.mindMap = null;
		}
		this.contentEl.empty()
	}
	//----------------------------------------------------------------------------------
  // @ts-ignore
  setSetting(element){
		const nav = buttons+smm_panel
	const navTop = document.createElement("div")
	navTop.classList.add("smm-navbar-brand")
	navTop.innerHTML = nav
	element.appendChild(navTop)
	this.renderPanel()
  }
  renderPanel(){
			const tabs = this.contentEl.querySelectorAll('.tab');
			const contents = this.contentEl.querySelectorAll('.content');
			// @ts-ignore
			for(const tab of tabs ){
				tab.addEventListener('click', () => {
					// 移除所有标签的活动状态
					// @ts-ignore
					for(const t of tabs){
						t.classList.remove('active')
					}
					// 隐藏所有内容
					// @ts-ignore
					for(const c of contents) {
						c.classList.remove('active')
					}
					// 添加当前标签的活动状态
					tab.classList.add('active');
					// 显示当前内容
					const tabId = tab.getAttribute('data-tab');
					// @ts-ignore
					this.contentEl.querySelector("#"+tabId).classList.add('active');
				});
				// @ts-ignore

			}
			tabs[0].classList.add('active');
			const tabId = tabs[0].getAttribute('data-tab');
			// @ts-ignore
// eslint-disable-next-line no-mixed-spaces-and-tabs
	  		this.contentEl.querySelector("#"+tabId).classList.add('active');
  }
  renderTheme(){
		// @ts-ignore
	for(const gitem of this.contentEl.querySelectorAll(".gallery-item")){
		gitem.onclick = ()=>{
			if(gitem.getAttribute("category") == "theme"){
				this.mindMap.setTheme(gitem.id)
				this.saveDataIntoFile()
			}
			if(gitem.getAttribute("category") == "structure"){
				this.mindMap.setLayout(gitem.id)
				this.saveDataIntoFile()
			}

		}
	}
  }
  pasteImage() {
	const fileInput = this.contentEl.querySelector('#fileInput');
	const pasteArea = this.contentEl.querySelector('#pasteArea');
	const imageUrl = this.contentEl.querySelector('#imageUrl');
	const loadUrlButton = this.contentEl.querySelector('#loadUrl');
	const previewImage = this.contentEl.querySelector('#previewImage');
	const dataUrlOutput = this.contentEl.querySelector('#dataUrlOutput');
	// 处理图片文件// eslint-disable-next-line no-inner-declarations
	const handleImageFile = (file: Blob | null)=> {
		const reader = new FileReader();
		reader.onload = function (e) {
			// @ts-ignore
			const dataUrl = e.target.result;
			updatePreview(dataUrl);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	}

	// 更新预览和DataURL// eslint-disable-next-line no-inner-declarations
	const updatePreview = (dataUrl: string | ArrayBuffer | null)=> {
		// @ts-ignore
		previewImage.src = dataUrl;
		// @ts-ignore
		dataUrlOutput.value = dataUrl;
		// 添加淡入动画
		// @ts-ignore
		previewImage.style.opacity = '0';
		setTimeout(() => {
			// @ts-ignore
			previewImage.style.opacity = '1';
			// @ts-ignore
			previewImage.style.transition = 'opacity 0.3s ease';
		}, 50);
	}

	// 从URL加载图片// eslint-disable-next-line no-inner-declarations
	const loadImageFromUrl = async (url: string) => {
		try {
			// 创建图片对象并设置跨域
			const img = new Image();
			img.crossOrigin = 'anonymous';

			// 改用 Promise 处理加载状态
			await new Promise((resolve, reject) => {
				img.onload = resolve;
				img.onerror = reject;
				img.src = url;

				// 检查缓存图片状态
				if (img.complete) resolve(img);
			});

			// 创建 canvas 并绘制图片
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('无法获取 canvas 上下文');

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			// 生成 dataURL
			const dataUrl = canvas.toDataURL('image/png');
			updatePreview(dataUrl);

		} catch (error) {
			console.error('图片加载失败:', error);
			alert('无法加载图片，请检查URL是否正确或服务器是否支持跨域');
		}
	}
	if (fileInput && pasteArea && imageUrl && loadUrlButton && previewImage && dataUrlOutput) {
		// 处理文件选择
		fileInput.addEventListener('change', function (e) {
			// @ts-ignore
			const file = e.target.files[0];
			if (file) {
				handleImageFile(file);
			}
		});

		// 处理粘贴事件
		pasteArea.addEventListener('click', function () {
			pasteArea.classList.add('active');
			setTimeout(() => {
				pasteArea.classList.remove('active');
				}, 1000);
		});

		document.addEventListener('paste', function (e) {
			// @ts-ignore
			const items = e.clipboardData.items;
			if (items) {
				for (let i = 0; i < items.length; i++) {
					if (items[i].type.indexOf('image') !== -1) {
						const file = items[i].getAsFile();
						handleImageFile(file);
						break;
					}
				}
			}
		});

		// 处理URL加载
		loadUrlButton.addEventListener('click', function () {
			// @ts-ignore
			const url = imageUrl.value.trim();
			if (url) {
				loadImageFromUrl(url);
			}
		});
		// @ts-ignore
		this.mindMap.on('node_active', (node,activeNodeList) => {
			// @ts-ignore
			this.contentEl.querySelector("#saveImage").onclick = ()=>{
				for(const anode of activeNodeList) {
					if(anode.isRoot){
						new Notice("根节点无法被操作")
						continue
					}
					// @ts-ignore
					if (dataUrlOutput.value) {
						anode.setImage({
							// @ts-ignore
							url: dataUrlOutput.value,
							title: '',
							width: 100,// 图片的宽高也不能少
							height: 100
						})
					} else {
						new Notice("DataUrl不能为空")
					}
				}
			}
		})


	}
  }
  setIcon(){
	const container = document.querySelector('.smm-icon-container');
	try {

		// @ts-ignore
		container.innerHTML = '';
		// @ts-ignore
		while(container.innerHTML == '') {
			// @ts-ignore
			this.renderIcons(container);
		}
	}catch{
		new Notice("插入图标报错，奇怪的错误",3000)
	}
	}
  renderIcons(container: Element | null) {
		// 清空容器


		// 遍历每种类型的图标
		for(const category of nodeIconList){
			// 创建类型卡片
			const card = document.createElement('div');
			card.className = 'smm-icon-card';

			// 创建类型标题
			const header = document.createElement('div');
			header.className = 'smm-icon-header';
			header.innerHTML = `
                    <span class="smm-icon-type">${category.type}</span>
                    <h2>${category.name}</h2>
                `;

			// 创建图标网格
			const iconGrid = document.createElement('div');
			iconGrid.className = 'smm-icon-grid';

			// 遍历该类型下的所有图标
			for (const iconItem of category.list){
				// 创建图标项
				const iconItemEl = document.createElement('div');
				iconItemEl.className = 'smm-icon-item';
				iconItemEl.setAttribute('data-name', iconItem.name);
				iconItemEl.setAttribute('data-type', category.type);
				// @ts-ignore
				this.mindMap.on('node_active', (node,activeNodeList) => {
					// @ts-ignore
					iconItemEl.onclick = ()=>{
						for(const anode of activeNodeList) {
							anode.setIcon([category.type+"_"+iconItem.name]);
						}
					}
					// @ts-ignore
					this.contentEl.querySelector("#delicon").onclick = ()=>{
						for(const anode of activeNodeList) {
							anode.setIcon([]);
						}
					}
				})
				// 设置图标内容
				iconItemEl.innerHTML = `
                        <div class="smm-icon-svg">
                            ${iconItem.icon}
                        </div>
                        <div class="smm-icon-name">${iconItem.name}</div>
                    `;

				// 添加到网格
				iconGrid.appendChild(iconItemEl);
			}

			// 将标题和网格添加到卡片
			card.appendChild(header);
			card.appendChild(iconGrid);

			// 将卡片添加到容器
			// @ts-ignore
			container.appendChild(card);
		}
		this.mindMap.on("node_icon_click",()=>{

		})
	}
  insertLink(){
		// @ts-ignore
	this.mindMap.on("node_active",(node,activeNodeList)=>{
		// @ts-ignore
		this.contentEl.querySelector("#insert-smm-external-link").onclick = ()=>{
			// @ts-ignore
			const link = this.contentEl.querySelector("#smm-external-link").value
			// @ts-ignore
			const name = this.contentEl.querySelector("#smm-external-name").value
			for(const anode of activeNodeList){
				anode.setHyperlink(link, name)
			}
		}
	})
  }

}

