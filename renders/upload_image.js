/**
 * @ author ethan
 * @ date  2025年05月13日 18:06
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
export const smm_upImage = `
<div class="smm-image-upload-header">图片上传</div>
        
        <div class="smm-upload-area">
            <!-- 拖放上传区域 -->
            <div class="smm-dropzone" id="dropzone">
                <div class="smm-dropzone-icon"><i class="fa fa-cloud-upload"></i></div>
                <div class="smm-dropzone-text">点击上传图片或拖放至此处</div>
            </div>
            
            <!-- 粘贴按钮 -->
            <div class="smm-dropzone" id="paste-button">
                <div class="smm-dropzone-icon"><i class="fa fa-cloud-upload"></i></div>
                <div class="smm-dropzone-text">点击此处，然后Ctrl+V</div>
            </div>
            
            <!-- URL 上传 -->
            <div class="smm-url-input">
                <input type="text" class="smm-url-input-field" id="url-input" placeholder="输入图片 URL">
                <button class="smm-url-input-button" id="load-url">加载</button>
            </div>
            
            <!-- 预览区域 -->
            <div class="smm-preview-container" id="preview-container">
                <img src="" alt="图片预览" class="smm-preview-image" id="preview-image">
                <div class="smm-preview-placeholder" id="preview-placeholder">图片将显示在这里</div>
            </div>
            
            <!-- DataURL 显示 -->
            <div class="smm-dataurl-container">
                <div class="smm-dataurl-label">URL</div>
                <textarea class="smm-dataurl-field" id="dataurl-field" readonly></textarea>
            </div>
            <button class="smm-action-button" style="width: 100%;margin-bottom:10px" id="upload-button" disabled>设置节点图片</button>
            <!-- 操作按钮 -->
            <div style="display: flex;justify-content: space-between;width: 100%">

            <button class="smm-action-button" id="upload-bg-button" disabled>设置画布背景</button>
            <button class="smm-action-button" id="clear-bg-button">清除背景图片</button>
            </div>
        </div>
`
