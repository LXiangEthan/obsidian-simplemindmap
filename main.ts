import {addIcon, App, ButtonComponent, Notice, Plugin, PluginSettingTab, Setting, TFile, WorkspaceLeaf} from 'obsidian'
import {SMMView, VIEW_TYPE_SMM} from "./view"
// @ts-ignore
import moment = require("moment")
//----------------------------
interface MyPluginSettings {
	myInputFolderPath: string;
	cartoon: boolean;
	myInputWater: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	myInputFolderPath: '',
	myInputWater: '',
	cartoon: false,
};
export default class ExamplePlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.checkForUpdates(true);

		// 每天检查一次更新
		setInterval(() => this.checkForUpdates(true), 24 * 60 * 60 * 1000);
		addIcon('ob-smm-brain', `
		<path d="M54.1667 50L87.5 50" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M54.1667 79.1667H87.5" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M54.1667 20.8333H87.5" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M37.5 50L12.5 50C12.5 50 15.9518 50 20.8333 50M37.5 79.1667C25 75 33.3333 50 20.8333 50M37.5 20.8333C25 25 33.3333 50 20.8333 50" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
    
		`);
		await this.loadSettings();
		this.registerView(VIEW_TYPE_SMM, (leaf: WorkspaceLeaf) => new SMMView(leaf));
		this.registerExtensions(["smm"], VIEW_TYPE_SMM);
		this.addCommand({
			id: 'create a smm mindmap',
			name: 'Create a SimpleMindMap File',
			callback: async () => {
				const {vault} = this.app;
				const date = new Date();
				const formattedDate = moment(date).format('YYYY-MM-DD-HH-mm-ss');
				const fileName = `${this.settings.myInputFolderPath}/SMM-${formattedDate}.smm`;
				const fileContent = `
{"svgData":"","layout":"logicalStructure","root":{"data":{"text":"根节点","expand":true,"uid":"3cb9f800-5a74-4609-a8ff-c37a0beb0bd8","richText":true,"isActive":false},"children":[{"data":{"text":"二级节点","generalization":{"text":"概要","uid":"cd2361f6-2cc4-4dc6-b336-57b46f8b33ed","richText":true,"expand":true,"isActive":false},"uid":"a7ae8e47-39fb-4370-ae20-d22f703e7065","richText":true,"expand":true,"isActive":false},"children":[{"data":{"text":"分支主题","uid":"ff04f5b8-f02b-4faf-b598-a5fb8f666b91","richText":true,"expand":true,"isActive":false},"children":[]},{"data":{"text":"分支主题","uid":"796eef36-18e2-41e2-96c6-25fcc2162d2d","richText":true,"expand":true,"isActive":false},"children":[]}]}],"smmVersion":"0.13.1-fix.2"},"theme":{"template":"classic4","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":0,"translateY":0,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"state":{"scale":1,"x":0,"y":0,"sx":0,"sy":0}}}				`

				try {
					// 检查文件是否已存在
					const existingFile = vault.getAbstractFileByPath(fileName);
					if (existingFile) {
						new Notice('文件已经存在',3000);
					} else {
						// 创建新文件
						await vault.create(fileName, fileContent);
						await this.app.workspace.openLinkText(fileName, '', true);
					}
				} catch (error) {
					new Notice('创建SMM文件失败' + error, 3000);
				}
			}
		})
		this.addSettingTab(new MySettingTab(this.app, this));
		this.addRibbonIcon('ob-smm-brain', 'create a smm mindmap', async () => {
			// 当按钮被点击时，在控制台输出信息
			const {vault} = this.app;
			const date = new Date();
			const formattedDate = moment(date).format('YYYY-MM-DD-HH-mm-ss');
			const fileName = `${this.settings.myInputFolderPath}/SMM-${formattedDate}.smm`;
			const fileContent = `
{"svgData":"","layout":"logicalStructure","root":{"data":{"text":"根节点","expand":true,"uid":"3cb9f800-5a74-4609-a8ff-c37a0beb0bd8","richText":true,"isActive":false},"children":[{"data":{"text":"二级节点","generalization":{"text":"概要","uid":"cd2361f6-2cc4-4dc6-b336-57b46f8b33ed","richText":true,"expand":true,"isActive":false},"uid":"a7ae8e47-39fb-4370-ae20-d22f703e7065","richText":true,"expand":true,"isActive":false},"children":[{"data":{"text":"分支主题","uid":"ff04f5b8-f02b-4faf-b598-a5fb8f666b91","richText":true,"expand":true,"isActive":false},"children":[]},{"data":{"text":"分支主题","uid":"796eef36-18e2-41e2-96c6-25fcc2162d2d","richText":true,"expand":true,"isActive":false},"children":[]}]}],"smmVersion":"0.13.1-fix.2"},"theme":{"template":"classic4","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":0,"translateY":0,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"state":{"scale":1,"x":0,"y":0,"sx":0,"sy":0}}}				`

			try {
				// 检查文件是否已存在
				const existingFile = vault.getAbstractFileByPath(fileName);
				if (existingFile) {
					new Notice('文件已经存在',3000);
				} else {
					// 创建新文件
					await vault.create(fileName, fileContent);
					await this.app.workspace.openLinkText(fileName, '', true);
				}
			} catch (error) {
				new Notice('创建SMM文件失败' + error, 3000);
			}
		});
		// @ts-ignore
		this.setupObsidianSmmInterceptor(async (smmUrl) => {
			let newPath = ""
			const length = smmUrl.split("/").length;
			newPath = this.settings.myInputFolderPath + "/" + smmUrl.split('/')[length - 1]
			const smmFile = this.app.vault.getAbstractFileByPath(newPath) as TFile;
			if (smmFile) {
				const content = await this.app.vault.read(smmFile);
				const blob = this.dataURItoBlob(JSON.parse(content).svgData);
				// 生成 Blob URL
				return URL.createObjectURL(blob);
			} else {
				new Notice(`SMM file not found: ${newPath}`);
			}
		});
		// @ts-ignore
		this.app.settings = this.settings
		// @ts-ignore
		this.app.vault.cacheLimit = 2000000		// @ts-ignore
		// ----------------------------------------------------------------------------
	}


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		this.saveData(this.settings)
		this.removeCommand('create a smm mindmap');
		this.addCommand({
			id: 'create a smm mindmap',
			name: 'Create a SimpleMindMap File',
			callback: async () => {
				const {vault} = this.app;
				const date = new Date();
				const formattedDate = moment(date).format('YYYY-MM-DD-HH-mm-ss');
				const fileName = `${this.settings.myInputFolderPath}/SMM-${formattedDate}.smm`;
				const fileContent = `
{"svgData":"","layout":"logicalStructure","root":{"data":{"text":"根节点","expand":true,"uid":"3cb9f800-5a74-4609-a8ff-c37a0beb0bd8","richText":true,"isActive":false},"children":[{"data":{"text":"二级节点","generalization":{"text":"概要","uid":"cd2361f6-2cc4-4dc6-b336-57b46f8b33ed","richText":true,"expand":true,"isActive":false},"uid":"a7ae8e47-39fb-4370-ae20-d22f703e7065","richText":true,"expand":true,"isActive":false},"children":[{"data":{"text":"分支主题","uid":"ff04f5b8-f02b-4faf-b598-a5fb8f666b91","richText":true,"expand":true,"isActive":false},"children":[]},{"data":{"text":"分支主题","uid":"796eef36-18e2-41e2-96c6-25fcc2162d2d","richText":true,"expand":true,"isActive":false},"children":[]}]}],"smmVersion":"0.13.1-fix.2"},"theme":{"template":"classic4","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":0,"translateY":0,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"state":{"scale":1,"x":0,"y":0,"sx":0,"sy":0}}}				`

				try {
					// 检查文件是否已存在
					const existingFile = vault.getAbstractFileByPath(fileName);
					if (existingFile) {
						new Notice('文件已经存在',3000);
					} else {
						// 创建新文件
						await vault.create(fileName, fileContent);
						await this.app.workspace.openLinkText(fileName, '', false);
					}
				} catch (error) {
					new Notice('创建SMM文件失败'+error,3000);
				}
			}
		})
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SMM);
	}

	//-------------------------------------------------------
	// plugin-setting
	dataURItoBlob(dataURI: string) {
		const byteString = atob(dataURI.split(',')[1]);
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], {type: mimeString});
	}


	// @ts-ignore
	/**
	 * SMM 文件拦截器 - 拦截所有 SMM 文件请求并替换 src 为处理后的 Blob URL
	 * @param processSmmContent 处理 SMM 文件内容的函数，接收原始内容并返回处理后的内容
	 */
	/**
	 * SMM 文件拦截器 - 支持 Obsidian 内部嵌入元素和原生 img 标签
	 * @param getBlobUrl 处理 SMM 文件 URL 的回调函数，返回 Blob URL
	 */
	setupObsidianSmmInterceptor(
		getBlobUrl: (url: string) => string | Promise<string>
	): { unmount: () => void } {
		const folder = this.settings.myInputFolderPath;
		const app =this.app
		const blobUrlCache = new Map<string, string>();

		// ===== 第一部分：拦截原生 img 标签 =====
		// const originalImgSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
		// Object.defineProperty(HTMLImageElement.prototype, 'src', {
		// 	set: async function (url: string) {
		// 		if (url.endsWith('.smm')) {
		// 			const blobUrl = await processUrl(url);
		// 			originalImgSrcDescriptor?.set?.call(this, blobUrl);
		// 		} else {
		// 			originalImgSrcDescriptor?.set?.call(this, url);
		// 		}
		// 	},
		// 	get: originalImgSrcDescriptor?.get,
		// 	configurable: true
		// });

		// ===== 第二部分：拦截 Obsidian 内部嵌入元素 =====
		function observeObsidianEmbeds() {
			const observer = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					// @ts-ignore
					for (const node of mutation.addedNodes) {
						if (node instanceof HTMLElement && node.classList.contains('internal-embed')) {
							processObsidianEmbed(node as HTMLElement);
						}
					}
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ['src']
			});

			// 初始化处理已存在的嵌入元素
			document.querySelectorAll('.internal-embed[src$=".smm"]').forEach(processObsidianEmbed);
		}


		this.registerMarkdownPostProcessor(async (element, context) => {
			const spanElements = element.querySelectorAll('.internal-embed');
			// @ts-ignore
			for (const span of spanElements) {
				const src = span.getAttribute('src');
				if (src && src.endsWith('.smm')) {
					let newPath = ""
					const length = src.split("/").length;
					newPath = this.settings.myInputFolderPath + "/" + src.split('/')[length - 1]
					const smmFile = this.app.vault.getAbstractFileByPath(newPath) as TFile;
					if (smmFile) {
						try {
							const content = await this.app.vault.read(smmFile);
							const newElement = document.createElement("div")
							newElement.classList.add('SMM-DRAW');
							if (span.parentNode) {
								// 检查父节点是否允许添加子元素
								if (span.parentNode.nodeName !== 'HTML') {
									span.parentNode.insertBefore(newElement, span);
									span.style.display = 'none'
									newElement.style.width = '100%'
									const blob = this.dataURItoBlob(JSON.parse(content).svgData);
									// 生成 Blob URL
									const blobUrl = URL.createObjectURL(blob);
									// @ts-ignore
									newElement.innerHTML = `<img src="${blobUrl}" class="embed-link-smm"></img>`

								} else {
									new Notice(`Cannot replace element inside ${span.parentNode.nodeName} node`,3000);
								}
							} else {
								new Notice(`No parent node found for ${src}`,3000);
							}
						} catch (error) {
							new Notice(`Error reading or processing ${src}:`+error,3000);
						}
					} else {
						new Notice(`SMM file not found: ${src}`,3000);
					}
				}
			}
			// @ts-ignore
			for (const e of document.querySelectorAll(".action_has")) {
				e.onclick = async () => {
					const filePath = e.getAttribute("file")
					await this.app.workspace.openLinkText(filePath, '', false);
				}
			}
		});

		function processObsidianEmbed(embed: HTMLElement) {
			const src = embed.getAttribute('src');
			if (src && src.endsWith('.smm')) {
				(async () => {
					try {
						const blobUrl = await getBlobUrl(src);
						// 处理 Obsidian 嵌入元素的显示逻辑
						embed.empty?.(); // 清空原有内容
						const img = document.createElement('img');
						img.src = blobUrl;
						img.style.maxWidth = '100%';
						img.style.maxHeight = '600px';
						embed.appendChild(img);

					} catch (error) {
						new Notice('Obsidian 嵌入元素处理失败:'+error,3000);
						embed.innerHTML = `<div class="error">Failed to load SMM: ${error.message}</div>`;
					}
				})();
			}
		}

		// ===== 第三部分：通用 URL 处理逻辑 =====
		// async function processUrl(url: string): Promise<string> {
		// 	if (blobUrlCache.has(url)) return blobUrlCache.get(url)!;
		//
		// 	try {
		// 		const blobUrl = await getBlobUrl(url);
		// 		blobUrlCache.set(url, blobUrl);
		// 		return blobUrl;
		// 	} catch (error) {
		// 		new Notice('URL 处理失败:'+error,3000);
		// 		return url; // 失败时返回原始 URL
		// 	}
		// }

		// ===== 第四部分：启动观察器和初始化 =====
		observeObsidianEmbeds();
		// @ts-ignore
		// eslint-disable-next-line no-self-assign
		setTimeout(() => document.querySelectorAll('img[src$=".smm"]').forEach(img => img.src = img.src), 200);




		function observeCanvasNodes() {
			const canvasRoot = document.querySelector('.canvas-wrapper');
			const canvasMutationObserver = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					// @ts-ignore
					for (const node of mutation.addedNodes) {
						if (node instanceof HTMLElement && node.classList.contains('canvas-node-content')) {
							renderSmmInCanvas(node as HTMLElement);
						}
					}
				}
			});

			// 开始监听 Canvas 容器
			// @ts-ignore
			canvasMutationObserver.observe(canvasRoot, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ['src'],
			});
			// 初始化处理已存在的嵌入元素
			document.querySelectorAll('.canvas-node-content').forEach(processObsidianEmbed);
		}

		const dataURItoBlob = this.dataURItoBlob
			async function renderSmmInCanvas(el: HTMLElement) {

			// @ts-ignore
			const filename = el.parentNode.nextSibling?.innerText
			if(!filename){
				return
			}
			const extension = filename.split('.')[filename.split('.').length - 1]
			if (extension == 'smm') {
				// @ts-ignore
				const node = el
					// @ts-ignore
					node.style.padding = '0px'
					const newPath = folder + "/" + filename
					// @ts-ignore
					const smmFile = app.vault.getAbstractFileByPath(newPath) as TFile;
					if (smmFile) {
						// @ts-ignore
						const content = await app.vault.read(smmFile);
						let svgData = JSON.parse(content).svgData
						if(!svgData){
							setTimeout(()=>{
								svgData = JSON.parse(content).svgData
								const bloburl = URL.createObjectURL(dataURItoBlob(svgData))
								// @ts-ignore
								node.innerHTML = `<img src="${bloburl}" width="100%" height="100%" draggable="false" style="position: absolute;z-index=100"></img>`
							},500)
						}
						const bloburl = URL.createObjectURL(dataURItoBlob(svgData))
						// @ts-ignore
						node.innerHTML = `<img src="${bloburl}" width="100%" height="100%" draggable="false" style="position: absolute;z-index=100"></img>`
					} else {
						new Notice('no such file')
					}
			}
		}
		this.app.workspace.on('file-open',(file)=>{
			if(file?.extension == 'canvas'){
				observeCanvasNodes()
			}
		})

			// ===== 卸载函数 =====
			return {
				unmount: () => {
					// 恢复原生 img 拦截
					// if (originalImgSrcDescriptor) {
					// 	Object.defineProperty(HTMLImageElement.prototype, 'src', originalImgSrcDescriptor);
					// }

					// 清理缓存
					blobUrlCache.forEach(url => URL.revokeObjectURL(url));
					blobUrlCache.clear();
				}
			};



	}

	async checkForUpdates(userInitiated: boolean) {
		try {
			const currentVersion = this.manifest.version;
			// 从 jsDelivr 获取最新的 manifest.json
			const response = await fetch('https://cdn.jsdelivr.net/gh/LXiangEthan/obsidian-simplemindmap@master/manifest.json?refresh',{cache: "reload"});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const latestManifest = await response.json();
			const latestVersion = latestManifest.version;
			if (this.isNewerVersion(latestVersion, currentVersion)) {
				if (userInitiated) {
					// 用户主动检查时显示详细通知
					const notice = new Notice(`Ob-SMM发现新版本: ${latestVersion} (当前: ${currentVersion})`,0);
					// 获取通知容器元素
					const noticeEl = notice.messageEl;
					// 在通知中添加按钮
					new ButtonComponent(noticeEl)
						.setButtonText("更新插件")
						.setCta() // 设置为主要按钮样式
						.onClick(async () => {
							// 按钮点击事件处理
							notice.hide(); // 隐藏通知
							new Notice("开始更新插件...");
							await this.updatePlugin();
							new Notice('更新完成，请重启 Obsidian 以应用更改');
						});
					new ButtonComponent(noticeEl)
						.setButtonText("取消更新")
						.setCta() // 设置为主要按钮样式
						.onClick(async () => {
							// 按钮点击事件处理
							notice.hide(); // 隐藏通知
						});
				} else {
					// 自动检查时仅显示静默通知
					new Notice(`插件更新可用: ${latestVersion} (当前: ${currentVersion})`);
				}
			} else if (userInitiated) {
				// new Notice('已是最新版本');
			}
		} catch (error) {
			new Notice('检查更新时出错:'+error);
			if (userInitiated) new Notice('检查更新失败');
		}
	}
	isNewerVersion(latest: string, current: string): boolean {
		const [lMajor, lMinor, lPatch] = latest.split('.').map(Number);
		const [cMajor, cMinor, cPatch] = current.split('.').map(Number);

		if (lMajor > cMajor) return true;
		if (lMajor < cMajor) return false;

		if (lMinor > cMinor) return true;
		if (lMinor < cMinor) return false;

		return lPatch > cPatch;
	}

	// 更新插件逻辑
	async updatePlugin() {
		try {
			const pluginDir = this.manifest.dir;

			// 下载最新的 main.js
			const mainJsUrl = 'https://cdn.jsdelivr.net/gh/LXiangEthan/obsidian-simplemindmap@master/main.js?refresh';
			const mainJsResponse = await fetch(mainJsUrl);
			if (!mainJsResponse.ok) throw new Error(`下载 main.js 失败: ${mainJsResponse.status}`);

			const mainJsContent = await mainJsResponse.text();
			await this.app.vault.adapter.write(`${pluginDir}/main.js`, mainJsContent);

			// 下载最新的 style.css
			const stylesCssUrl = 'https://cdn.jsdelivr.net/gh/LXiangEthan/obsidian-simplemindmap@master/styles.css?refresh';
			const stylesCssResponse = await fetch(stylesCssUrl);
			if (!stylesCssResponse.ok) throw new Error(`下载 styles.css 失败: ${stylesCssResponse.status}`);

			const stylesCssContent = await stylesCssResponse.text();
			await this.app.vault.adapter.write(`${pluginDir}/styles.css`, stylesCssContent);

			// 更新 manifest.json
			const manifestUrl = 'https://cdn.jsdelivr.net/gh/LXiangEthan/obsidian-simplemindmap@master/manifest.json?refresh';
			const manifestResponse = await fetch(manifestUrl);
			if (!manifestResponse.ok) throw new Error(`下载 manifest.json 失败: ${manifestResponse.status}`);

			const manifestContent = await manifestResponse.text();
			await this.app.vault.adapter.write(`${pluginDir}/manifest.json`, manifestContent);

			return true;
		} catch (error) {
			console.error('更新插件时出错:', error);
			throw error;
		}
	}
}



class MySettingTab extends PluginSettingTab {
	plugin: ExamplePlugin;

	constructor(app: App, plugin: ExamplePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Ob-smm' });

		new Setting(containerEl)
			.setName('输入您保存文件的路径')
			.setDesc('input the path of folder')
			.addText(text => text
				.setPlaceholder('The path of folder')
				.setValue(this.plugin.settings.myInputFolderPath)
				.onChange(async (value) => {
					this.plugin.settings.myInputFolderPath = value;
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('输入您的水印文字')
			.setDesc('input the name of watermarkConfig')
			.addText(text => text
				.setPlaceholder('The watermarkConfig')
				.setValue(this.plugin.settings.myInputWater)
				.onChange(async (value) => {
					this.plugin.settings.myInputWater = value;
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName("是否开启启动动画")
			.setDesc("打开页面播放启动动画")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.cartoon)
				.onChange(async (value) => {
					this.plugin.settings.cartoon = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
