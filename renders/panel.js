/**
 * @ author ethan
 * @ date  2025年05月09日 14:48
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
import {smm_theme} from "./theme";
import {smm_structure} from "./structure";
import {smm_nodestyle} from "./nodestyle";
import {smm_ustyle} from "./universalstyle";
import {smm_upImage} from "./upload_image";
import {smm_settings} from "./setting";

export const smm_panel = `
<div class="smm-resize-handle" id="smm-resizeHandle"></div>
    <div class="smm-sidebar">
    	<!-- 节点样式选项卡 -->
	<button class="smm-tab active" title="节点样式" calor="smm-nodestyle-container">
    	<svg viewBox="0 0 24 24">
        	<path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/>
        	<path d="M12,6c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,6,12,6z"/>
        	<path d="M12,14c-2.21,0-4,1.79-4,4h2c0-1.1,0.9-2,2-2s2,0.9,2,2h2C16,15.79,14.21,14,12,14z"/>
    	</svg>
    	<span class="smm-tab-text">节点样式</span>
	</button>

	<!-- 基础样式选项卡 -->
	<button class="smm-tab" title="基础样式" calor="smm-universalstyle-container">
    	<svg viewBox="0 0 24 24">
        	<path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/>
        	<path d="M7,7h10v2H7V7z"/>
        	<path d="M7,11h10v2H7V11z"/>
        	<path d="M7,15h10v2H7V15z"/>
    	</svg>
    	<span class="smm-tab-text">基础样式</span>
	</button>

	<!-- 设置选项卡 -->
	<button class="smm-tab" title="设置" calor="smm-system-setting">
    	<svg viewBox="0 0 24 24">
        	<path d="M19.43,12.98c0.04-0.32,0.07-0.64,0.07-0.98c0-0.34-0.03-0.66-0.07-0.98l2.11-1.65c0.19-0.15,0.24-0.42,0.12-0.64l-2-3.46c-0.12-0.22-0.37-0.29-0.59-0.22l-2.49,0.96c-0.52-0.39-1.08-0.73-1.69-1l0.29-2.72c0.05-0.47-0.17-0.92-0.52-1.23L14.17,1.73c-0.34-0.27-0.77-0.37-1.19-0.29l-2.66,0.54c-0.4,0.08-0.76,0.29-1.07,0.56L7.3,1.73C6.96,1.46,6.53,1.36,6.09,1.44L5.07,4.16C4.85,4.5,4.94,4.93,5.22,5.22l0.96,2.49c-0.36,0.61-0.72,1.26-1,1.96L3.73,7.83C3.46,8.19,3.36,8.62,3.44,9.06l2.59,1.03c-0.04,0.32-0.07,0.65-0.07,0.98s0.03,0.66,0.07,0.98L3.44,14.94c-0.08,0.44,0.02,0.87,0.29,1.19l2.72,0.29c0.36,0.68,0.76,1.32,1.23,1.85l-0.96,2.49c-0.22,0.52-0.15,1.08,0.22,1.49l3.46,2c0.22,0.12,0.49,0.05,0.69-0.16l2.66-0.54c0.4-0.08,0.76-0.29,1.07-0.56l2.49,0.96c0.22,0.08,0.47,0.05,0.67-0.09l3.46-2c0.42-0.32,0.52-0.88,0.22-1.49l-0.96-2.49c0.47-0.53,0.87-1.17,1.23-1.85l2.72-0.29c0.27-0.32,0.37-0.75,0.29-1.19l-2.59-1.03C19.5,13.64,19.47,13.31,19.43,12.98z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z"/>
    	</svg>
    	<span class="smm-tab-text">设置</span>
	</button>

	<!-- 大纲选项卡 -->
	<button class="smm-tab" title="大纲" calor="smm-dg-outline-container">
    	<svg viewBox="0 0 24 24">
        	<path d="M3,6h18v2H3V6z M3,11h12v2H3V11z M3,16h18v2H3V16z"/>
        	<path d="M7,20h2v-2H7V20z M7,15h2v-2H7V15z M7,10h2V8H7V10z M7,5h2V3H7V5z"/>
    	</svg>
    	<span class="smm-tab-text">大纲</span>
	</button>
        <!-- 主题选项卡 -->
        <button class="smm-tab" title="主题" calor="smm-themes-container">
            <svg viewBox="0 0 24 24">
                <path d="M12,19c-3.866,0-7-3.134-7-7s3.134-7,7-7s7,3.134,7,7S15.866,19,12,19z M12,5c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S14.757,5,12,5z"/>
                <path d="M12,13c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,13,12,13z"/>
                <path d="M5,5h2v2H5zM17,5h2v2h-2zM5,17h2v2H5zM17,17h2v2h-2z"/>
            </svg>
            <span class="smm-tab-text">主题</span>
        </button>

        <!-- 结构选项卡 -->
        <button class="smm-tab" title="结构" calor="smm-structure-container">
            <svg viewBox="0 0 24 24">
                <path d="M3,5H21V7H3V5z M3,11H21V13H3V11z M3,17H21V19H3V17z"/>
            </svg>
            <span class="smm-tab-text">结构</span>
        </button>

        <!-- 图片选项卡 -->
        <button class="smm-tab" title="图片" calor="smm-upload-image">
            <svg viewBox="0 0 24 24">
                <path d="M21,19V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z M8.5,13.5l2.5,3.01L14.5,12l4.5,6H5L8.5,13.5z M10,9c1.1,0,2-0.9,2-2s-0.9-2-2-2S8,5.9,8,7S8.9,9,10,9z"/>
            </svg>
            <span class="smm-tab-text">图片</span>
        </button>

        <!-- 图标选项卡 -->
        <button class="smm-tab" title="图标" calor="smm-imgtag-container">
            <svg viewBox="0 0 24 24">
                <path d="M19,19H5V5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-7h-2V19z"/>
                <path d="M14,3v2h3.59l-9.83,9.83l1.41,1.41L19,6.41V10h2V3H14z"/>
            </svg>
            <span class="smm-tab-text">图标</span>
        </button>
    </div>

    <!-- 主内容区域 -->
    <div class="smm-main-content">
        <div class="smm-themes-container smm-contents-container" style="display: none">
        ${smm_theme}
        </div>
        <div class="smm-structure-container smm-contents-container" style="display: none">
        ${smm_structure}
        </div>
        <div class="smm-nodestyle-container smm-contents-container">
        ${smm_nodestyle}
        </div>
        <div class="smm-universalstyle-container smm-contents-container" style="display: none">
        ${smm_ustyle}
        </div>
        <div class="smm-upload-image smm-contents-container" style="display: none">
        ${smm_upImage}
        </div>
        <div class="smm-imgtag-container smm-contents-container" style="display: none">
        <div id="iconsContainer">
            <!-- 图标组将通过JavaScript动态生成 -->
        </div>
		</div>
		<div id="smm-dg-outline" class="smm-dg-outline-container smm-contents-container" style="display: none"></div>
		<div class="smm-system-setting smm-contents-container" style="display: none">${smm_settings}</div>
    </div>
`
