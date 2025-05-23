
import {IconName, Notice, TextFileView, TFile} from "obsidian";
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
import Search from 'simple-mind-map/src/plugins/Search.js'

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
import {nodeIconList} from 'simple-mind-map/src/svg/icons'

// @ts-ignore
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'

// @ts-ignore
import Formula from 'simple-mind-map/src/plugins/Formula.js'
// @ts-ignore
import RichText from 'simple-mind-map/src/plugins/RichText.js'
import {buttons_sf} from "./renders/SF";

// @ts-ignore
import MindMapLayoutPro from 'simple-mind-map/src/plugins/MindMapLayoutPro.js'

import {loading_gif} from "./renders/loading_gif";

import {smm2outlines} from "./utils/smm2outlines";

import {resize_panel} from "./renders/resize";

// @ts-ignore
import RainbowLines from 'simple-mind-map/src/plugins/RainbowLines.js'
// @ts-ignore
import Demonstrate from 'simple-mind-map/src/plugins/Demonstrate.js'

// @ts-ignore
import markdown from 'simple-mind-map/src/parse/markdown.js'
// @ts-ignore
import xmind from 'simple-mind-map/src/parse/xmind.js'

// @ts-ignore
import moment = require("moment")

// @ts-ignore
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
// import Watermark from 'simple-mind-map/src/Watermark.js' v0.6.0以下版本使用该路径

MindMap.usePlugin(Watermark)
MindMap.usePlugin(Demonstrate)
MindMap.usePlugin(RainbowLines)
MindMap.usePlugin(MindMapLayoutPro)
MindMap.usePlugin(MindMapLayoutPro)
MindMap.usePlugin(RichText)
MindMap.usePlugin(Formula)
MindMap.usePlugin(TouchEvent)
MindMap.usePlugin(OuterFrame)
MindMap.usePlugin(Search)
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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
export class SMMView extends TextFileView {
	private mindMap: any
	private miap: any;
	private viap: any;
	private smm_mindmap: HTMLDivElement;
	private viewBoxStyle: any;
	private currentFile: any;
	private isStart: boolean;
	private isEnd: boolean;
	private node: any;
	private activeNodeList: any;
	private isDemoing = false;
	private noResize = false;
	private saveTimer: number;
	private file_lock = false;
	private refuse = false;
	clear() {
		console.log("清理一次")
		this.data = '';
		if (this.mindMap) {
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
		this.registerEvent(this.app.vault.on('modify',(file)=>{
			this.file_lock = true
		}))
		this.registerEvent(this.app.workspace.on('file-open',()=>{
			this.file_lock = false
		}))
		// eslint-disable-next-line no-constant-condition
		this.registerEvent(this.app.workspace.on('active-leaf-change', async (leaf) => {
			if (this.app.workspace.getActiveFile()?.extension == 'smm') {
				// eslint-disable-next-line no-self-assign
				this.currentFile = this.app.workspace.getActiveFile()
				this.file_lock = false
			} else {
				return
			}
		}))
	}

	async onClose() {
		if (this.mindMap) {
			await this.mindMap.destroy();
			this.mindMap = null;
		}
		this.contentEl.empty()
	}
	getIcon(): IconName {
		return 'ob-smm-brain';
	}

	getViewData() {
		return this.data;
	}

	setViewData(data: string) {
		if(this.file_lock){
			return false
		}
		if (this.mindMap) {
			this.mindMap.destroy();
			this.mindMap = null;
		}
		this.data = data
		this.contentEl.empty()
		this.contentEl.setAttribute('width','100%')
		this.contentEl.setAttribute('height','100%')
		// @ts-ignore
		let loadingImg = null
		// @ts-ignore
		if(this.app.settings.cartoon){
			loadingImg = document.createElement('img')
			loadingImg.classList.add('smm-loading');
			loadingImg.src=loading_gif
		}
		this.data = data;
		this.contentEl.createEl('div', {attr: {class: 'smm-window-leaf'}, text: ''});
		const roots = this.contentEl.querySelector(".smm-window-leaf")
		// @ts-ignore
		roots.setAttribute('width', '100%');
		// @ts-ignore
		roots.setAttribute('height', '100%');
		// @ts-ignore
		if(this.app.settings.cartoon){
			// @ts-ignore
			roots.appendChild(loadingImg)
		}
		this.smm_mindmap = document.createElement('div')
		this.smm_mindmap.setAttribute('class', 'ob-simple-mindMapContainer');
		this.smm_mindmap.setAttribute('width', '100%');
		this.smm_mindmap.setAttribute('height', '100%');
		this.setSetting(roots);
		// @ts-ignore
		roots.appendChild(this.smm_mindmap);
		// @ts-ignore
		const smm_sf = document.createElement("div")
		smm_sf.innerHTML = buttons_sf
		smm_sf.id = "smm-SL"
		smm_sf.classList.add("smm-button-group")
		// @ts-ignore
		roots.appendChild(smm_sf)
		const smm_panel_d = document.createElement("div")
		smm_panel_d.id = "smm-panel-container"
		smm_panel_d.innerHTML = smm_panel
		smm_panel_d.style.display = "none"
		// @ts-ignore
		roots.appendChild(smm_panel_d)
		const myMinimap = document.createElement('div')
		myMinimap.setAttribute('class', 'miniMapContainer');
		this.smm_mindmap.appendChild(myMinimap);
		myMinimap.style.display = 'none';
		myMinimap.setAttribute("transform-origin", "left top");
		const myMinimapborder = document.createElement('div')
		myMinimapborder.setAttribute('class', 'viewBoxContainer');
		this.smm_mindmap.appendChild(myMinimapborder);
		myMinimapborder.style.display = 'none'
		// @ts-ignore
		const newData = JSON.parse(data)
		// @ts-ignore
		const {root, layout, theme, view} = newData

			try {
				// @ts-ignore
				this.mindMap = new MindMap({
					el: this.contentEl.querySelector(".ob-simple-mindMapContainer"),
					data: root,
					layout: layout,
					theme: theme.template,
					themeConfig: theme.config,
					viewData: view,
				})
				setTimeout(async () => {
					// @ts-ignore
					this.addEventWithButton()
					this.outLinkrefresh()
					// @ts-ignore
					if (this.app.settings.cartoon) {
						// @ts-ignore
						loadingImg.remove()
					}
					await this.saveDataIntoFile()
				}, 500)
			} catch(e){
				setTimeout(() => {
					try {
					// @ts-ignore
					this.mindMap = new MindMap({
						el: this.contentEl.querySelector(".ob-simple-mindMapContainer"),
						data: root,
						layout: layout,
						theme: theme.template,
						themeConfig: theme.config,
						viewData: view,
					})
						setTimeout(async () => {
							// @ts-ignore
							this.addEventWithButton()
							this.outLinkrefresh()
							// @ts-ignore
							if (this.app.settings.cartoon) {
								// @ts-ignore
								loadingImg.remove()
							}
							await this.saveDataIntoFile()
						}, 500)
					}catch{
						return
					}
				}, 1000)
			}
	}
	async saveDataIntoFile() {
		await lock.acquire('resource', async () => {
		const current = this.currentFile
		// @ts-ignore
		const thisNode = this.mindMap.renderer.textEdit.getCurrentEditNode()?this.mindMap.renderer.textEdit.getCurrentEditNode():null
		const content = await this.mindMap.getData(true)
		const svgObj = await this.mindMap.export('svg', false, '')
		content.svgData = svgObj
		if(thisNode) {
			await this.mindMap.renderer.textEdit.show({node: thisNode,isInserting:true})
		}
		if (current instanceof TFile && current.extension == "smm") {
			try {
				clearTimeout(this.saveTimer)
				// @ts-ignore
				this.saveTimer = setTimeout(() => {
						this.file_lock = true
						this.app.vault.modify(current, JSON.stringify(content)).then(() => {
							this.file_lock = false
						})
				}, 50)
			}catch(e){
				console.log(e)
			}
		}
	})

	}
	addEventWithButton() {
		this.mindMap.on("node_active", (node: any, activeNodeList: any) => {
			this.node = node
			this.activeNodeList = activeNodeList
			this.renderNodeStyle()
		})
		this.mindMap.on("view_data_change",async ()=>{
			const scale = this.mindMap.view.getTransformData().state.scale
			// @ts-ignore
			this.contentEl.querySelector(".smm-zoom-input").value = parseInt((scale*100))+"%"
		})

		this.mindMap.on("data_change",async ()=>{
			await this.saveDataIntoFile()
			this.renderMinimap()
			this.outLinkrefresh()
		})
		this.mindMap.keyCommand.addShortcut('Control+F8', () => {
			this.mindMap.renderer.textEdit.show({node:this.node})
		})
		this.miap = this.contentEl.querySelector(".miniMapContainer")
		this.viap = this.contentEl.querySelector(".viewBoxContainer")
		this.miap.style.display = "none"
		this.viap.style.display = 'none'
		this.noResize = false
		this.app.workspace.on("resize",()=>{
			if(this.noResize){
				return
			}
			if(!this.mindMap){
				return
			}
			try {
				this.mindMap.resize()
			}catch{
			// 	莫名其妙的报错
			}
		})
		// @ts-ignore
		this.mindMap?.resize()
			// @ts-ignore
		this.contentEl.querySelector("#smm-createAssociativeLine").onclick = async () => {
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
		this.contentEl.querySelector("#smm-addLink-button").onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector("#smm-insertLink").removeAttribute("style")
		}
		this.renderLinkInput()
		this.renderTag()
		// @ts-ignore
		this.contentEl.querySelector("#smm-setnote").onclick = ()=>{
				// @ts-ignore
				this.contentEl.querySelector("#smm-input-note").removeAttribute("style")
				const pre_note = this.node?.getData('note')
				if(!pre_note){
					return
				}
				// @ts-ignore
				this.contentEl.querySelector(".smm-note-input").value = pre_note!==undefined?pre_note:""
			}
		// @ts-ignore
		// 更新字符计数
		const textarea = document.querySelector('.smm-note-input');
		const charCount = this.contentEl.querySelector('#char-count');
		// @ts-ignore
		textarea.addEventListener('input', () => {
			// @ts-ignore
			const count = textarea.value.length;
			// @ts-ignore
			charCount.textContent = count;
			// 限制最大字符数
			if (count > 1000) {
				// @ts-ignore
				textarea.value = textarea.value.substring(0, 1000);
				// @ts-ignore
				charCount.textContent = 1000;
				new Notice("最大字数为1000字",1200)
			}
		});
		// @ts-ignore
		this.contentEl.querySelector("#smm-save-note").onclick = ()=>{
			// @ts-ignore
			const textarrea_note = this.contentEl.querySelector(".smm-note-input")
			// @ts-ignore
			const text = textarrea_note.value
			this.mindMap.execCommand('SET_NODE_NOTE',this.node,text)
			// @ts-ignore
			textarrea_note.value = ""
			// @ts-ignore
			this.contentEl.querySelector("#smm-input-note").style.display = "none"

		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-close-note").onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector("#smm-input-note").style.display = "none"
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-hide-search").onclick = ()=>{
			// @ts-ignore
			if(this.contentEl.querySelector(".smm-search-container").style.display == "none"){
				// @ts-ignore
				this.contentEl.querySelector(".smm-search-container").removeAttribute("style")
			}else{
				// @ts-ignore
				this.contentEl.querySelector(".smm-search-container").style.display = "none"
				// @ts-ignore
				this.contentEl.querySelector(".smm-search-input").value = ""
			}
		}

		// @ts-ignore
		this.contentEl.querySelector("#smm-formula-button").onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector(".smm-formula-editor").removeAttribute("style")
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-formula-cancel").onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector(".smm-formula-editor").style.display = "none"
		}
			// @ts-ignore
			this.contentEl.querySelector("#smm-formula-enter").onclick = ()=>{
				// @ts-ignore
				const latexText = this.contentEl.querySelector(".smm-formula-input").value
				this.mindMap.execCommand('INSERT_FORMULA', latexText, this.activeNodeList)
				// @ts-ignore
				this.contentEl.querySelector(".smm-formula-editor").style.display = "none"
			}
		// @ts-ignore
		this.contentEl.querySelector(".smm-zoom-input").onclick = ()=>{
			this.mindMap.view.reset();
			// @ts-ignore
			this.contentEl.querySelector(".smm-zoom-input").value = "100%"
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-enlarge-button").onclick = ()=>{
			this.mindMap.view.enlarge();
			// @ts-ignore
			const scale = this.contentEl.querySelector(".smm-zoom-input").value;
			const num = parseInt(scale.split("%")[0])+25
			// @ts-ignore
			this.contentEl.querySelector(".smm-zoom-input").value = num+"%"
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-narrow-button").onclick = ()=>{
			this.mindMap.view.narrow();

			// @ts-ignore
			const scale = this.contentEl.querySelector(".smm-zoom-input").value;
			const num = parseInt(scale.split("%")[0])-25
			// @ts-ignore
			this.contentEl.querySelector(".smm-zoom-input").value = num+"%"
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-center-button").onclick = ()=>{
			this.mindMap.view.fit();
		}
		// @ts-ignore
		this.mindMap.on('back_forward', (index, len) => {
			this.isStart = index <= 0
			this.isEnd = index >= len - 1
		})
		// @ts-ignore
		this.contentEl.querySelector("#smm-back").onclick = ()=>{
			if(this.isStart){
				new Notice("当前处于历史记录最开始",3000)
			}else{
				this.mindMap.execCommand('BACK')
			}
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-forward").onclick = ()=>{
			if(this.isEnd){
				new Notice("当前是最新历史记录",3000)
			}else{
				this.mindMap.execCommand('FORWARD')
			}
		}
		// @ts-ignore
		this.contentEl.querySelector(".smm-search-btn").onclick = ()=>{
			// @ts-ignore
			this.mindMap.search.search(this.contentEl.querySelector("#searchInput").value, () => {
				// @ts-ignore
				this.contentEl.querySelector("#searchInput").focus()
			})
		}
		// @ts-ignore
		this.contentEl.querySelector("#searchInput").onkeyup = (event)=>{
			event.preventDefault();
			if (event.keyCode === 13) {
				// @ts-ignore
				this.mindMap.search.search(this.contentEl.querySelector("#searchInput").value, () => {
					// @ts-ignore
					this.contentEl.querySelector("#searchInput").focus()
				})
			}
			if(event.keyCode === 27){
				// @ts-ignore
				this.contentEl.querySelector(".smm-search-container").style.display = "none"
			}
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-insert-node").onclick = ()=>{
			this.mindMap.execCommand('INSERT_CHILD_NODE')
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-delete-node").onclick = ()=>{
			this.mindMap.execCommand('REMOVE_NODE')
		}
		// @ts-ignore
		this.contentEl.querySelector("#smm-panel-button").onclick = ()=>{
			const panel = this.contentEl.querySelector("#smm-panel-container")
			// @ts-ignore
			if(panel.style.display == "none"){
				// @ts-ignore
				panel.removeAttribute("style")
			}else{
				// @ts-ignore
				panel.style.display = "none"
			}
		}
		this.bandOnPanel()
		this.getTheme()
		const allTheme = this.contentEl.querySelectorAll(".smm-theme-card")
		// @ts-ignore
		for(const theme of allTheme){
			theme.onclick = ()=>{
				const themeName = theme.getAttribute("themeCal")
				this.mindMap.setThemeConfig({})
				this.mindMap.setTheme(themeName,false)
				this.mindMap.emit('data_change')
			}
		}
		const allStructure = this.contentEl.querySelectorAll(".smm-structure-card")
		// @ts-ignore
		for(const structure of allStructure){
			structure.onclick = ()=>{
				const structureName = structure.getAttribute("structure-cal")
				this.mindMap.setLayout(structureName)
				this.mindMap.emit('data_change')
			}
		}
		this.upload_Image()
		this.renderIcons()
			// @ts-ignore
			for(const ic of this.contentEl.querySelectorAll(".smm-imgtag-icon-card")) {
				ic.onclick = ()=>{
					// @ts-ignore
					const imgtag = ic.getAttribute("destiny")
					for(const anode of this.activeNodeList){
						anode.setIcon([imgtag])
					}
				}
			}
		// @ts-ignore
		this.contentEl.querySelector("#smm-list-table").onclick = ()=>{
			const list = this.contentEl.querySelector("#smm-list-tables")
			// @ts-ignore
			if(list.style.display == 'none'){
				// @ts-ignore
				list.removeAttribute('style')
			}else{
				// @ts-ignore
				list.style.display = 'none';
			}
		}
		// @ts-ignore
		this.contentEl.querySelector(".smm-tag-delete").onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector(".smm-tag-input").value = ''
			// @ts-ignore
			this.contentEl.querySelector(".smm-tag-input").focus()
		}

		// @ts-ignore
		this.mindMap.on("node_icon_mouseenter",(t,i,e,n)=>{
			// @ts-ignore
			this.mindMap.on('node_icon_click',(t: { setIcon: (arg0: never[]) => void; })=>{
				t.setIcon([])
			})
		})
		this.setUniversalStyle()
		// @ts-ignore
		this.contentEl.querySelector('#smm-demostrate-button').onclick =async  ()=>{
			this.mindMap?.resize()
			// @ts-ignore
			this.noResize = true
			this.mindMap.demonstrate.enter()
		}
		this.mindMap.on('exit_demonstrate',()=>{
			this.noResize = false
			this.mindMap?.resize()
		})
		this.mindMap.on('demonstrate_jump',()=>{
			this.mindMap?.resize()
		})
		this.setNodeStyle()
		// @ts-ignore
		this.contentEl.querySelector('#smm-search-obsidian').addEventListener('input',()=>{
			// @ts-ignore
			const files = this.app.vault.getMarkdownFiles();
			const results: { path: string, name: string }[] = [];

			for (const file of files) {
				// @ts-ignore
				if(file.path.toLowerCase().includes(this.contentEl.querySelector('#smm-search-obsidian').value)){
					results.push({path:file.path,name:file.name})
				}
			}
			const res = results.map((item)=>
            `<div class="smm-search-item">
                <span class="smm-search-item-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M19,19H5V5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z"/>
                        <path d="M14,3v2h3.59l-9.83,9.83l1.41,1.41L19,6.41V10h2V3H14z"/>
                    </svg>
                </span>
                <div class="smm-search-item-title">${item.name}</div>
                <div class="smm-search-item-path">${item.path}</div>
            </div>`).join('')
			// @ts-ignore
			this.contentEl.querySelector('#search-results').innerHTML = res
			setTimeout(()=>{
				this.contentEl.querySelectorAll(".smm-search-item").forEach(item=>{
					// @ts-ignore
					item.onclick = ()=>{
						// @ts-ignore
						const file = this.app.vault.getAbstractFileByPath(item.children[2].innerText)
						console.log(file)
						if(!file){
							new Notice('插入内链失败',3000)
							return
						}
						// @ts-ignore
						const localUrl = getInternalUrl(file);
						// @ts-ignore
						this.activeNodeList.forEach(node=>{
							// @ts-ignore
							node.setHyperlink(localUrl, item.children[2].innerText)
						})
						// @ts-ignore
						this.contentEl.querySelector('#smm-insertLink').style.display = 'none'
					}
				})
			},200)
			const app = this.app
			function getInternalUrl(file: TFile) {
				// 编码文件名和路径，避免特殊字符问题
				const encodedPath = encodeURIComponent(file.path);
				return `obsidian://open? Vault=${encodeURIComponent(app.vault.getName())}&file=${encodedPath}`;
			}
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-import-md').onclick = ()=>{
			this.readFileByBrowser().then(async obj => {
				if (obj) {
					// @ts-ignore
					this.mindMap.setData(await markdown.transformMarkdownTo(obj.content))
				} else {
					new Notice('操作取消或文件读取失败');
				}
			})
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-import-xmind').onclick = ()=>{

			this.readFileByBrowser().then(async obj => {
				if (obj) {
					// @ts-ignore
					this.mindMap.setData(await xmind.parseXmindFile(obj.file,async (list) => {
						if (list.length > 1) {
							new Notice('当前文件具有多个画布，请不要关闭，正在为您导入', 3000)
							for(let i=1; i < list.length; i++) {
								const {vault} = this.app;
								const date = new Date();
								const formattedDate = moment(date).format('YYYY-MM-DD-HH-mm-ss');
								// @ts-ignore
								const fileName = `${this.app.settings.myInputFolderPath}/SMM-${formattedDate}.smm`;
								const fileContent = `${list[i]}`
								try {
									// 检查文件是否已存在
									const existingFile = vault.getAbstractFileByPath(fileName);
									if (existingFile) {
										new Notice('文件已经存在', 3000);
									} else {
										// 创建新文件
										await vault.create(fileName, fileContent);
										await this.app.workspace.openLinkText(fileName, '', true);
									}
								} catch (error) {
									new Notice('创建SMM文件失败' + error, 3000);
								}
							}
						}
					}))
				} else {
					new Notice('操作取消或文件读取失败');
				}
			})
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-export-svg').onclick = async () => {
			await this.mindMap.export('svg', true, '未命名')
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-export-md').onclick = ()=>{
			this.mindMap.export('md', true, '未命名')
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-if-water').addEventListener('change', async ()=>{
			// @ts-ignore
			if(this.contentEl.querySelector('#smm-if-water').checked){
				this.mindMap.watermark.updateWatermark({
					// @ts-ignore
					text: this.app.settings.myInputWater,
					lineSpacing: 50,
					textSpacing: 50,
					angle: 45,
					textStyle: {
						color: '#73D8FF',
						opacity: 1,
						fontSize: 12
					}
				})
			}else{
				this.mindMap.watermark.updateWatermark({
					// @ts-ignore
					text: '',
					lineSpacing: 50,
					textSpacing: 50,
					angle: 45,
					textStyle: {
						color: '#73D8FF',
						opacity: 1,
						fontSize: 12
					}
				})
			}
		})
	}
	renderMinimap(){
		// @ts-ignore
		if (this.miap.style.display == "none"){
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
	//----------------------------------------------------------------------------------
  // @ts-ignore
  setSetting(element){
	const nav = buttons
	const navTop = document.createElement("div")
	navTop.classList.add("smm-navbar-brand")
	navTop.innerHTML = nav
	element.appendChild(navTop)
  }
  renderLinkInput(){
	const urlTypeBtn = this.contentEl.querySelector('#url-type');
	const obsidianTypeBtn = this.contentEl.querySelector('#obsidian-type');
	const urlInputContainer = this.contentEl.querySelector('#url-input-container');
	const obsidianInputContainer = this.contentEl.querySelector('#obsidian-input-container');
	const searchResults = this.contentEl.querySelector('#search-results');
	// @ts-ignore
	searchResults.style.display = 'none';
	// @ts-ignore
	urlTypeBtn.addEventListener('click', () => {
	// @ts-ignore
		urlTypeBtn.classList.add('active');
	// @ts-ignore
		obsidianTypeBtn.classList.remove('active');
	// @ts-ignore
		urlInputContainer.style.display = 'block';
	// @ts-ignore
		obsidianInputContainer.style.display = 'none';
	// @ts-ignore
		searchResults.style.display = 'none';
	});
	// @ts-ignore
	this.contentEl.querySelector("#smm-cancel-smm-link").onclick = ()=>{
		// @ts-ignore
		this.contentEl.querySelector("#smm-insertLink").style.display = "none";
	}
	// @ts-ignore
	obsidianTypeBtn.addEventListener('click', () => {
		// @ts-ignore
		obsidianTypeBtn.classList.add('active');
		// @ts-ignore
		urlTypeBtn.classList.remove('active');
		// @ts-ignore
		urlInputContainer.style.display = 'none';
		// @ts-ignore
		obsidianInputContainer.style.display = 'block';
		// @ts-ignore
		searchResults.style.display = 'block';
	});
	
		// @ts-ignore
		this.contentEl.querySelector("#smm-add-link-button").onclick = ()=>{
			console.log("插入链接")
			// @ts-ignore
			if(urlTypeBtn.classList.contains('active')){
				// @ts-ignore
				const link = this.contentEl.querySelector("#smm-url-link").value
				// @ts-ignore
				if(link == ''){
					new Notice("链接不能为空")
					return
				}
				// @ts-ignore
				const name = this.contentEl.querySelector("#smm-url-name").value
				for(const anode of this.activeNodeList){
					// @ts-ignore
					anode.setHyperlink(link, name)
				}

			}else{
			// 	obsidian文件搜索
			}
			// @ts-ignore
			this.contentEl.querySelector("#smm-insertLink").style.display = "none";
		}
		
  }
  renderTag(){
		// @ts-ignore
		this.contentEl.querySelector("#smm-tag-button").onclick = ()=>{
			// @ts-ignore
			if(this.contentEl.querySelector("#smm-tag-block").style.display == "none"){
				// @ts-ignore
				this.contentEl.querySelector("#smm-tag-block").removeAttribute("style");
				const tagArr = this.node?.getData('tag') || []
				if(!tagArr){
					return
				}
				for(const tag of tagArr){
					// @ts-ignore
					const tagElement = document.createElement('div');
					tagElement.className = 'smm-tag-item';
					tagElement.innerHTML = `
      				${tag.text}
      				<span class="smm-tag-remove">×</span>
    				`;

					// @ts-ignore
					this.contentEl.querySelector("#tags-list").appendChild(tagElement);
				}
				this.initTagInputEvents()
			}
		}
		// @ts-ignore
		this.contentEl.querySelector("#save-btn").onclick = ()=>{
			const tags = this.getTagArray()
			this.node.setTag(tags)
			// @ts-ignore
			this.contentEl.querySelector("#smm-tag-block").style.display = "none"
			// @ts-ignore
			this.contentEl.querySelector("#tags-list").innerHTML = ""

		}

	// @ts-ignore
	this.contentEl.querySelector("#exit-btn").onclick = ()=>{
		// @ts-ignore
		this.contentEl.querySelector("#smm-tag-block").style.display = "none"
		// @ts-ignore
		this.contentEl.querySelector("#tags-list").innerHTML = ""
	}
  }
	initTagInputEvents() {
		// 获取DOM元素
		const input = this.contentEl.querySelector('#smm-tag-block .smm-tag-input') as HTMLInputElement;
		const addBtn = this.contentEl.querySelector('#add-tag-btn') as HTMLButtonElement;
		const tagsList = this.contentEl.querySelector('#tags-list') as HTMLElement;

		// 事件注册：输入框Enter键添加标签
		// @ts-ignore
		this.contentEl.querySelector("#add-tag-btn").onclick = ()=> {
			addTag(input.value.trim());
			input.value = ''; // 清空输入框
			addBtn.onclick =  () => {
				addTag(input.value.trim());
				input.value = ''; // 清空输入框
			}
		}

		// 事件注册：添加按钮点击添加标签
		addBtn.addEventListener('click', () => {
			addTag(input.value.trim());
			input.value = ''; // 清空输入框
		});
		this.contentEl.querySelectorAll('.smm-tag-remove').forEach(t=>{
			// @ts-ignore
			t.onclick = ()=>{
				// @ts-ignore
				tagsList.removeChild(t.parentNode)
			}
		})
		// 动态添加标签到列表
		function addTag(text: string) {

			if (!text) return;

			const tagElement = document.createElement('div');
			tagElement.className = 'smm-tag-item';
			const removeBtn = document.createElement('span')
			removeBtn.innerText = '×'
			removeBtn.classList.add('smm-tag-remove')
			tagElement.innerHTML = `
      ${text}
    `;
			tagElement.appendChild(removeBtn)

			tagsList.appendChild(tagElement);
			removeBtn.addEventListener('click', () => {
				tagsList.removeChild(tagElement);
			});
		}

	}
	getTagArray() {
		const tagsList = this.contentEl.querySelector('#tags-list') as HTMLElement;
		const tagElements = tagsList.querySelectorAll('.smm-tag-item');

		return Array.from(tagElements).map(element => {
			// 移除删除按钮文本
			const text = element.textContent?.replace('×', '').trim() || '';

			return {
				text,
				style: {
					backgroundColor: getComputedStyle(element).backgroundColor,
					color: getComputedStyle(element).color
				}
			};
		});
	}
	bandOnPanel(){
		const tabs = this.contentEl.querySelectorAll(".smm-tab")
		const tabContents = this.contentEl.querySelectorAll(".smm-contents-container")
		// @ts-ignore
		for(const tab of tabs){
			tab.onclick = ()=>{
				const contentClassName = tab.getAttribute("calor");
				// @ts-ignore
				for(const tab2 of tabs){
					tab2.classList.remove("active")
				}
				// @ts-ignore
				for(const tab2content of tabContents){
					if(tab2content.classList.contains(contentClassName)){
						tab2content.removeAttribute("style")
						continue
					}
					tab2content.style.display = "none"
				}
				tab.classList.add("active")
			}
		}
	}
	getTheme(){
		this.changeCalorTheme()
	}
	changeCalorTheme(){
		const select = this.contentEl.querySelector('#theme-category-select');
		const lightThemes = this.contentEl.querySelector('#light-themes');
		const darkThemes = this.contentEl.querySelector('#dark-themes');
		const minimalThemes = this.contentEl.querySelector('#minimal-themes');

		// @ts-ignore
		select.addEventListener('change', function () {
			const value = this.value;
			if (value === 'all') {
				// @ts-ignore
				lightThemes.classList.remove('hidden');
				// @ts-ignore
				darkThemes.classList.remove('hidden');
				// @ts-ignore
				minimalThemes.classList.remove('hidden');
			} else if (value === 'light') {
				// @ts-ignore
				lightThemes.classList.remove('hidden');
				// @ts-ignore
				darkThemes.classList.add('hidden');
				// @ts-ignore
				minimalThemes.classList.add('hidden');
			} else if (value === 'dark') {
				// @ts-ignore
				lightThemes.classList.add('hidden');
				// @ts-ignore
				darkThemes.classList.remove('hidden');
				// @ts-ignore
				minimalThemes.classList.add('hidden');
			} else if (value ==='minimal') {
				// @ts-ignore
				lightThemes.classList.add('hidden');
				// @ts-ignore
				darkThemes.classList.add('hidden');
				// @ts-ignore
				minimalThemes.classList.remove('hidden');
			}
		});
	}
	upload_Image(){
		const dropzone = this.contentEl.querySelector('#dropzone');
		const previewImage = this.contentEl.querySelector('#preview-image');
		const previewPlaceholder = this.contentEl.querySelector('#preview-placeholder');
		const dataurlField = this.contentEl.querySelector('#dataurl-field');
		const uploadButton = this.contentEl.querySelector('#upload-button');
		const uploadBgButton = this.contentEl.querySelector('#upload-bg-button');
		const urlInput = this.contentEl.querySelector('#url-input');
		const loadUrlButton = this.contentEl.querySelector('#load-url');
		const pasteButton = this.contentEl.querySelector('#paste-button');

		// 隐藏的文件输入框
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		document.body.appendChild(fileInput);

		// 粘贴状态
		let pasteEnabled = false;

		// 处理文件上传
		function handleFile(file: Blob) {
			if (!file.type.match('image.*')) {
				new Notice('请上传图片文件！',3000);
				return;
			}

			const reader = new FileReader();
			reader.onload = function(e) {
				// @ts-ignore
				const dataUrl = e.target.result;
				// @ts-ignore
				previewImage.src = dataUrl;
				// @ts-ignore
				previewImage.style.display = 'block';
				// @ts-ignore
				previewPlaceholder.style.display = 'none';
				// @ts-ignore
				dataurlField.value = dataUrl;
				// @ts-ignore
				uploadButton.disabled = false;
				// @ts-ignore
				uploadBgButton.disabled = false;
			};
			reader.readAsDataURL(file);
		}
		// @ts-ignore
		const timer = null
		// 开始粘贴倒计时
		function startPasteCountdown() {
			// @ts-ignore
			clearTimeout(timer)
			pasteEnabled = true;
			// @ts-ignore
			pasteButton.classList.add('active');
			// @ts-ignore
			setTimeout(()=>{
				// @ts-ignore
				pasteButton.classList.remove('active');
			},800)
		}

		// 点击上传区域
		// @ts-ignore
		dropzone.addEventListener('click', () => {
			fileInput.click();
		});

		// 文件选择
		fileInput.addEventListener('change', (e) => {
			// @ts-ignore
			if (e.target.files.length > 0) {
				// @ts-ignore
				handleFile(e.target.files[0]);
			}
		});

		// 拖放处理
		// @ts-ignore
		dropzone.addEventListener('dragover', (e) => {
			e.preventDefault();
			// @ts-ignore
			dropzone.classList.add('active');
		});

		// @ts-ignore
		dropzone.addEventListener('dragleave', () => {
			// @ts-ignore
			dropzone.classList.remove('active');
		});

		// @ts-ignore
		dropzone.addEventListener('drop', (e) => {
			e.preventDefault();
			// @ts-ignore
			dropzone.classList.remove('active');

			// @ts-ignore
			if (e.dataTransfer.files.length > 0) {
				// @ts-ignore
				handleFile(e.dataTransfer.files[0]);
			}
		});

		// 粘贴图片
		document.addEventListener('paste', (e) => {
			if (!pasteEnabled) return;

			if (e.clipboardData && e.clipboardData.items) {
				// @ts-ignore
				for (const item of e.clipboardData.items) {
					if (item.kind === 'file') {
						const file = item.getAsFile();
						handleFile(file);
						pasteEnabled = false;
						// @ts-ignore
						pasteButton.classList.remove('active');
						break;
					}
				}
			}
		});

		// 点击粘贴按钮
		// @ts-ignore
		pasteButton.addEventListener('click', () => {
			startPasteCountdown();
		});

		// URL 加载
		// @ts-ignore
		loadUrlButton.addEventListener('click', () => {
			// @ts-ignore
			const url = urlInput.value.trim();
			if (!url) {
				alert('请输入图片 URL');
				return;
			}

			const fullUrl = url.startsWith('http') ? url : `https://${url}`;

			// 显示加载状态
			// @ts-ignore
			previewPlaceholder.textContent = '加载中...';
			// @ts-ignore
			previewPlaceholder.style.display = 'block';
			// @ts-ignore
			previewImage.style.display = 'none';

			// 使用Image对象加载图片（无需CORS）
			const img = new Image();
			let timeoutId: string | number | NodeJS.Timeout | null | undefined = null;

			// 设置超时
			const setLoadTimeout = () => {
				timeoutId = setTimeout(() => {
					// @ts-ignore
					previewPlaceholder.textContent = '加载超时，请检查URL或网络';
				}, 10000);
			};

			img.onload = () => {
				// @ts-ignore
				clearTimeout(timeoutId);
				// @ts-ignore
				previewImage.src = fullUrl;  // 直接使用原始URL
				// @ts-ignore
				previewImage.style.display = 'block';
				// @ts-ignore
				previewPlaceholder.style.display = 'none';
				// @ts-ignore
				dataurlField.value = fullUrl;  // 存储URL而非DataURL
				// @ts-ignore
				uploadButton.disabled = false;
				// @ts-ignore
				uploadBgButton.disabled = false;
			};

			img.onerror = () => {
				// @ts-ignore
				clearTimeout(timeoutId);
				// @ts-ignore
				previewPlaceholder.textContent = '加载失败，请检查URL是否有效';
			};

			img.src = fullUrl;
			setLoadTimeout();
		});

		// 上传按钮点击事件
			// @ts-ignore
			uploadButton.onclick = () => {
				// @ts-ignore
				const dataUrl = dataurlField.value;
				if (!dataUrl) {
					return;
				}
				for(const anode of this.activeNodeList){
					anode.setImage({
						url: dataUrl,
						title: '',
						width: 100,// 图片的宽高也不能少
						height: 100
					})
				}
				// @ts-ignore
				previewImage.src = ""
				// @ts-ignore
				dataurlField.value = ""
			}
	}

	renderIcons() {
		const container = this.contentEl.querySelector('#iconsContainer');

		// 清空容器
		// @ts-ignore
		container.innerHTML = '';

		// 遍历图标数据中的每个类别
		for (const category of nodeIconList){
			// 创建类别容器
			const categoryContainer = document.createElement('div');
			categoryContainer.className = 'smm-imgtag-category';

			// 创建类别标题
			const categoryTitle = document.createElement('div');
			categoryTitle.className = 'smm-imgtag-category-title';
			categoryTitle.textContent = category.name;

			// 创建图标网格
			const iconGrid = document.createElement('div');
			iconGrid.className = 'smm-imgtag-grid';

			// 添加图标到网格
			for(const iconItem of category.list){
				const iconCard = document.createElement('div');
				iconCard.className = 'smm-imgtag-icon-card';
				iconCard.setAttribute("destiny", category.type+"_"+iconItem.name)
				const iconElement = document.createElement('div');
				iconElement.className = 'smm-imgtag-icon';
				iconElement.innerHTML = iconItem.icon;
				// @ts-ignore

				const iconName = document.createElement('div');
				iconName.className = 'smm-imgtag-icon-name';
				iconName.textContent = iconItem.name;

				iconCard.appendChild(iconElement);
				iconCard.appendChild(iconName);
				iconGrid.appendChild(iconCard);
			}

			// 将标题和网格添加到类别容器
			categoryContainer.appendChild(categoryTitle);
			categoryContainer.appendChild(iconGrid);

			// 将类别容器添加到主容器
			// @ts-ignore
			container.appendChild(categoryContainer);
		}
	}
	outLinkrefresh(){
		const data = this.mindMap.getData()
		smm2outlines(this.mindMap,data,this.contentEl,document)
		resize_panel(this.contentEl,document)
	}

	setUniversalStyle() {
		// @ts-ignore
		for(const color of this.contentEl.querySelectorAll('.smm-ustyle-color-square')){
			color.onclick = ()=> {
				this.mindMap.setThemeConfig({
					...this.mindMap.themeConfig,
					backgroundColor: color.style['background-color']
				})
			}
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-bg-color').addEventListener('change', ()=> {
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				backgroundColor: this.contentEl.querySelector('#smm-bg-color').value
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-line-color').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				lineColor: this.contentEl.querySelector('#smm-ustyle-line-color').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-line-width').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				lineWidth: this.contentEl.querySelector('#smm-ustyle-line-width').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-line-width').value = this.mindMap.themeConfig.lineWidth
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-line-fad').addEventListener('change',()=>{
			// @ts-ignore
			const style = this.contentEl.querySelector('#smm-ustyle-line-fad').value
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				lineStyle: style,
				rootLineKeepSameInCurve: true,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-line-fad').value = this.mindMap.themeConfig.lineStyle
		// @ts-ignore
		this.contentEl.querySelector('#smm-straight-radiu').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				lineRadius: Number(this.contentEl.querySelector('#smm-straight-radiu').value),
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-if-arrow').addEventListener('change',()=>{
				this.mindMap.setThemeConfig({
					...this.mindMap.themeConfig,
					// @ts-ignore
					showLineMarker: this.contentEl.querySelector('#smm-if-arrow').checked?true:false,
				})
			this.mindMap.emit('data_change')
		})
		if(this.mindMap.themeConfig.showLineMarker){
			// @ts-ignore
			this.contentEl.querySelector('#smm-if-arrow').checked=true
		}else{
			// @ts-ignore
			this.contentEl.querySelector('#smm-if-arrow').removeAttribute('checked')
		}
		// @ts-ignore
		this.contentEl.querySelector('#upload-bg-button').onclick = ()=>{
			const dataurlField = this.contentEl.querySelector('#dataurl-field');
			// @ts-ignore
			const dataUrl = dataurlField.value;
			if (!dataUrl) {
				return;
			}
			this.mindMap.setThemeConfig({
				backgroundImage: dataUrl,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'cover'
			})
			const previewImage = this.contentEl.querySelector('#preview-image');
			// @ts-ignore
			previewImage.src = ""
			// @ts-ignore
			dataurlField.value = ""
			this.mindMap.emit('data_change')
		}
		// @ts-ignore
		this.contentEl.querySelector('#clear-bg-button').onclick = ()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				backgroundImage: '',
			})
			this.mindMap.emit('data_change')
		}
		// @ts-ignore
		this.contentEl.querySelector('.smm-ustyle-rainbow-line').onclick = ()=>{
			console.log(this.mindMap.rainbowLines)
			this.mindMap.rainbowLines.updateRainLinesConfig({open:true})
			this.mindMap.emit('data_change')
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-close-rainbow').onclick = ()=>{
			console.log(this.mindMap.rainbowLines)
			this.mindMap.rainbowLines.updateRainLinesConfig({open:false})
			this.mindMap.emit('data_change')
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-generalize-color').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				generalizationLineColor: this.contentEl.querySelector('#smm-generalize-color').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-generalize-width').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				generalizationLineWidth: this.contentEl.querySelector('#smm-generalize-width').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-generalize-width').value = this.mindMap.themeConfig.generalizationLineWidth
		// @ts-ignore
		this.contentEl.querySelector('#smm-associal-line').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineColor: this.contentEl.querySelector('#smm-associal-line').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-associalline-width').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineWidth: this.contentEl.querySelector('#smm-associalline-width').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-associalline-width').value = this.mindMap.themeConfig.associativeLineWidth
		// @ts-ignore
		this.contentEl.querySelector('#smm-associalline-active').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineActiveColor: this.contentEl.querySelector('#smm-associalline-active').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-asocialline-active-width').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineActiveWidth: this.contentEl.querySelector('#smm-asocialline-active-width').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-asocialline-active-width').value = this.mindMap.themeConfig.associativeLineActiveWidth
		// @ts-ignore
		this.contentEl.querySelector('#smm-line-word').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineTextFontFamily: this.contentEl.querySelector('#smm-line-word').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-line-word').value = this.mindMap.themeConfig.associativeLineTextFontFamily
		// @ts-ignore
		this.contentEl.querySelector('#smm-line-word-color').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineTextColor: this.contentEl.querySelector('#smm-line-word-color').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-line-word-size').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				associativeLineTextFontSize: this.contentEl.querySelector('#smm-line-word-size').value,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-line-word-size').value = this.mindMap.themeConfig.associativeLineTextFontSize
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-border-style').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				nodeUseLineStyle: this.contentEl.querySelector('#smm-node-border-style').checked,
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-border-style').value = this.mindMap.themeConfig.nodeUseLineStyle

		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-node-padding-x').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				paddingX: Number(this.contentEl.querySelector('#smm-ustyle-node-padding-x').value),
			})
			this.mindMap.emit('data_change')

		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-node-padding-x').value = this.mindMap.themeConfig.paddingX

		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-node-padding-y').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				paddingY: Number(this.contentEl.querySelector('#smm-ustyle-node-padding-y').value),
			})
			this.mindMap.emit('data_change')
			// @ts-ignore
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-ustyle-node-padding-y').value = this.mindMap.themeConfig.paddingY

		// @ts-ignore
		this.contentEl.querySelector('#smm-imgTag-size').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				// @ts-ignore
				iconSize: Number(this.contentEl.querySelector('#smm-imgTag-size').value),
			})
			this.mindMap.emit('data_change')

		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-imgTag-size').value = this.mindMap.themeConfig.iconSize

		// @ts-ignore
		this.contentEl.querySelector('#smm-node-second').onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-second').classList.add('active')
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-third').classList.remove('active')
			// @ts-ignore
			this.contentEl.querySelector('#smm-us-second-style').removeAttribute('style')
			// @ts-ignore
			this.contentEl.querySelector('#smm-us-third-style').style.display = 'none'
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-third').onclick = ()=>{
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-third').classList.add('active')
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-second').classList.remove('active')
			// @ts-ignore
			this.contentEl.querySelector('#smm-us-third-style').removeAttribute('style')
			// @ts-ignore
			this.contentEl.querySelector('#smm-us-second-style').style.display = 'none'
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-justify-margin').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
					second: {
						// @ts-ignore
						marginX: Number(this.contentEl.querySelector('#smm-node-justify-margin').value),
					},
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-justify-margin').value = this.mindMap.themeConfig.second.marginX

		// @ts-ignore
		this.contentEl.querySelector('#smm-node-vertical-margin').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				second: {
					// @ts-ignore
					marginY: Number(this.contentEl.querySelector('#smm-node-vertical-margin').value)
				},
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-vertical-margin').value = this.mindMap.themeConfig.second.marginY


		// @ts-ignore
		this.contentEl.querySelector('#smm-node-t-justify-margin').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				node: {
					// @ts-ignore
					marginX: Number(this.contentEl.querySelector('#smm-node-t-justify-margin').value),
				},
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-t-justify-margin').value = this.mindMap.themeConfig.node.marginX
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-t-vertical-margin').addEventListener('change',()=>{
			this.mindMap.setThemeConfig({
				...this.mindMap.themeConfig,
				node: {
					// @ts-ignore
					marginY: Number(this.contentEl.querySelector('#smm-node-t-vertical-margin').value)
				},
			})
			this.mindMap.emit('data_change')
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-t-vertical-margin').value = this.mindMap.themeConfig.node.marginY
	}
	setNodeStyle(){
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-word-zt').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('fontFamily',this.contentEl.querySelector('#smm-node-word-zt').value)})
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-word-zh').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('fontSize',Number(this.contentEl.querySelector('#smm-node-word-zh').value))})
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-bgcolor').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('color',this.contentEl.querySelector('#smm-nodestyle-bgcolor').value)})
		})

		// @ts-ignore
		this.contentEl.querySelector('.smm-nodestyle-bold').addEventListener('click',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('fontWeight', 'bold')})
		})
		// @ts-ignore
		this.contentEl.querySelector('.smm-nodestyle-italic').addEventListener('click',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('fontStyle', 'italic')})
		})
		// @ts-ignore
		this.contentEl.querySelector('.smm-nodestyle-underline').addEventListener('click',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('textDecoration', 'underline')})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-border-color').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('borderColor',this.contentEl.querySelector('#smm-nodestyle-border-color').value)})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-border-color').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('borderColor',this.contentEl.querySelector('#smm-nodestyle-border-color').value)})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-line').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('borderDasharray',this.contentEl.querySelector('#smm-nodestyle-line').value)})
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-line-width').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('borderWidth',Number(this.contentEl.querySelector('#smm-nodestyle-line-width').value))})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-roundRadiu').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('borderRadius',Number(this.contentEl.querySelector('#smm-nodestyle-roundRadiu').value))})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-bgcolor-bg').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('fillColor',this.contentEl.querySelector('#smm-nodestyle-bgcolor-bg').value)})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-node-shape').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('shape',this.contentEl.querySelector('#smm-node-shape').value)})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-nodeline-color').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('lineColor',this.contentEl.querySelector('#smm-nodeline-color').value)})
		})

		// @ts-ignore
		this.contentEl.querySelector('#smm-node-ys-style').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('lineDasharray',this.contentEl.querySelector('#smm-node-ys-style').value)})
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-line-width').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('lineWidth',Number(this.contentEl.querySelector('#smm-node-line-width').value))})
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-justify-padding').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('paddingX',Number(this.contentEl.querySelector('#smm-nodestyle-justify-padding').value))})
		})
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-vertical-padding').addEventListener('change',()=>{
			// @ts-ignore
			this.activeNodeList.forEach((anode)=>{anode.setStyle('paddingY',Number(this.contentEl.querySelector('#smm-nodestyle-vertical-padding').value))})
		})
	}
	renderNodeStyle(){
		if(!this.node){
			return
		}
		if(this.node.isRoot){
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-word-zt').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-word-zh').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-nodestyle-line').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-nodestyle-line-width').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-nodestyle-roundRadiu').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-shape').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-ys-style').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-node-line-width').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-nodestyle-justify-padding').value = ''
			// @ts-ignore
			this.contentEl.querySelector('#smm-nodestyle-vertical-padding').value = ''
			return
		}
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-word-zt').value = this.node.getStyle('fontFamily', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-word-zh').value = this.node.getStyle('fontSize', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-line').value = this.node.getStyle('borderDasharray', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-line-width').value = this.node.getStyle('borderWidth', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-roundRadiu').value = this.node.getStyle('borderRadius', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-shape').value = this.node.getStyle('shape', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-ys-style').value = this.node.getStyle('lineDasharray', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-node-line-width').value = this.node.getStyle('lineWidth', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-justify-padding').value = this.node.getStyle('paddingX', this.node.isRoot)
		// @ts-ignore
		this.contentEl.querySelector('#smm-nodestyle-vertical-padding').value = this.node.getStyle('paddingY', this.node.isRoot)
	}

	/**
	 * 浏览器环境：通过文件选择器获取文件内容
	 * @returns {Promise<string|null>} 文件内容（文本格式）或 null（操作取消/失败）
	 */
	readFileByBrowser() {
		return new Promise((resolve) => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = '.md, .xmind';

			input.onchange = async (e) => {
				// @ts-ignore
				const file = e.target.files[0];
				if (!file) {
					resolve(null);
					return;
				}

				const reader = new FileReader();
				reader.onload = () => {
					const content = reader.result?.toString();
					resolve({ file, content });
				};

				reader.onerror = () => resolve(null);
				reader.readAsText(file);
			};

			input.click();
		});
	}

}
