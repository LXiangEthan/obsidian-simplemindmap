import {addIcon, App, Notice, Plugin, PluginSettingTab, Setting, TFile, WorkspaceLeaf} from 'obsidian'
import {SMMView, VIEW_TYPE_SMM} from "./view"
// @ts-ignore
import moment = require("moment")
//----------------------------
interface MyPluginSettings {
	myInputFolderPath: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	myInputFolderPath: ''
};
export default class ExamplePlugin extends Plugin {
	settings: MyPluginSettings;
	private folder: string;

	async onload() {
		addIcon('ob-smm-brain', `
		<path d="M54.1667 50L87.5 50" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M54.1667 79.1667H87.5" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M54.1667 20.8333H87.5" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M37.5 50L12.5 50C12.5 50 15.9518 50 20.8333 50M37.5 79.1667C25 75 33.3333 50 20.8333 50M37.5 20.8333C25 25 33.3333 50 20.8333 50" stroke="#333" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
    
		`);

		await this.loadSettings();
		this.registerView(VIEW_TYPE_SMM, (leaf: WorkspaceLeaf) => new SMMView(leaf));
		this.registerExtensions(["smm"], VIEW_TYPE_SMM);

		// 添加命令
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
		// -------------------------------------------------------------------------------
		// 阅读模式下嵌入处理
		// @ts-ignore


		// 使用示例
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
	}

	getLeafForFile(file: TFile) {
		const leaves = this.app.workspace.getLeavesOfType('markdown');
		for (const leaf of leaves) {
			const view = leaf.view;
			// @ts-ignore
			if (view.file && view.file.path === file.path) {
				return leaf;
			}
		}
		return null;
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
		const blobUrlCache = new Map<string, string>();

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


		// ===== 第四部分：启动观察器和初始化 =====
		observeObsidianEmbeds();



		// ===== 卸载函数 =====
		return {
			unmount: () => {

				// 清理缓存
				blobUrlCache.forEach(url => URL.revokeObjectURL(url));
				blobUrlCache.clear();
			}
		};



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

		containerEl.createEl('h2', { text: 'Obsidian-with-SimpleMindMap' });

		new Setting(containerEl)
			.setName('Input the folderPath to create new smm file')
			.setDesc('input the path of folder')
			.addText(text => text
				.setPlaceholder('The path of folder')
				.setValue(this.plugin.settings.myInputFolderPath)
				.onChange(async (value) => {
					this.plugin.settings.myInputFolderPath = value;
					await this.plugin.saveSettings();
				}));
	}
}
