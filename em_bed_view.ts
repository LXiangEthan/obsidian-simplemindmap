import {WorkspaceLeaf, View, TFile } from 'obsidian';
import MindMap from "simple-mind-map";
// @ts-ignore
import Export from 'simple-mind-map/src/plugins/Export.js'
MindMap.usePlugin(Export)

export class CustomView extends View {
	private mindMap: any;
	private contentEl: any;
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return 'custom-view';
	}

	getDisplayText(): string {
		return 'Custom View';
	}

	async onOpen() {
		// 模拟 Markdown 内容
		const markdownContent = `这是一个包含 .smm 外链的文档：![MindMap](index.smm)`;
		const processedContent = await this.processMarkdown(markdownContent);
		this.contentEl.innerHTML = processedContent;
	}

	async processMarkdown(content: string): Promise<string> {
		const regex = /!\[([^\]]+)\]\(([^)]+\.smm)\)/g;
		let match;
		let result = content;

		while ((match = regex.exec(content))!== null) {
			const filePath = match[2];
			const file = this.app.vault.getAbstractFileByPath(filePath) as TFile;
			if (file) {
				const fileContent = await this.app.vault.read(file);
				const svgHtml = await this.processSmmFile(fileContent);
				result = result.replace(match[0], svgHtml);
			}
		}

		return result;
	}

	async processSmmFile(content: string): Promise<string> {
		// @ts-ignore
		const temp = document.createDiv('div', '', { class: 'embed-simple-mindMapContainer-template' });
		// @ts-ignore
		this.mindMap = new MindMap({ el: temp, data: JSON.parse(content) });
		
		const svgData = this.mindMap.export.getSvgData();
		// 注意：这里不能直接用 <img> 标签包裹 SVG 数据，应直接返回 SVG 代码
		return svgData;
	}

	async onClose() {
		// 视图关闭时的清理操作
	}
}
