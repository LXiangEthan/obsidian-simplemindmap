/**
 * @ author ethan
 * @ date  2025年05月09日 14:54
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
export const buttons = `
    <div class="smm-toolbar">
        <!-- 第一组功能按钮 -->
        <div class="smm-button-group">
            <button class="smm-btn" title="连接" id="smm-createAssociativeLine">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button class="smm-btn" title="外框" id="smm-addOutLine">
                <svg viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3z" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <button class="smm-btn" title="小地图" id="smm-showMap">
                <svg viewBox="0 0 24 24">
                    <path d="M15 5H5v14h14V9l-4-4zm-4 10V8l5.5 5.5-5.5 0z" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <button class="smm-btn" title="概要" id="smm-GENERALIZATION">
                <svg viewBox="0 0 24 24">
                    <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2z"/>
                </svg>
            </button>
            <button class="smm-btn" title="备注" id="smm-setnote">
                <svg viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 0 0-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 0-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 0-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 0 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
            </button>
            <button class="smm-btn" title="标签" id="smm-tag-button">
                <svg viewBox="0 0 24 24">
                    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                </svg>
            </button>
            <button class="smm-btn" title="公式" id="smm-formula-button">
                <svg viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V6h4v6zm6 6h-4v-4h4v4zm0-6h-4V6h4v6z"/>
                </svg>
            </button>
            <button class="smm-btn" title="链接" id="smm-addLink-button">
        		<svg viewBox="0 0 24 24">
            		<path d="M17,7h-4v2h4c1.65,0,3,1.35,3,3s-1.35,3-3,3h-4v2h4c2.76,0,5-2.24,5-5S19.76,7,17,7z"/>
            		<path d="M12,13H7c-1.65,0-3-1.35-3-3s1.35-3,3-3h5V5H7C4.24,5,2,7.24,2,10s2.24,5,5,5h5V13z"/>
        		</svg>
    		</button>
            <button class="smm-btn" title="侧边工具栏" id="smm-panel-button">
                <svg viewBox="0 0 24 24">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </button>

        </div>



        <!-- 分隔线 -->
        <div class="smm-divider"></div>

        <!-- 第三组功能按钮 -->
        <div class="smm-button-group">
            <button class="smm-btn" title="向后" id="smm-back">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                </svg>
            </button>
            <button class="smm-btn" title="向前" id="smm-forward">
                <svg viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>
            <button class="smm-btn" title="插入节点" id="smm-insert-node">
    			<svg viewBox="0 0 24 24" width="16" height="16">
        			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z" fill="currentColor"/>
    			</svg>
			</button>

			<button class="smm-btn" title="删除节点" id="smm-delete-node">
    			<svg viewBox="0 0 24 24" width="16" height="16">
        			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-11H8v2h8V9zm0 4H8v2h8v-2z" fill="currentColor"/>
    			</svg>
			</button>
        </div>

        <!-- 分隔线 -->
        <div class="smm-divider"></div>

        <!-- 第四组功能按钮 -->
        <div class="smm-button-group">
            <button class="smm-btn" title="居中" id="smm-center-button">
                <svg viewBox="0 0 24 24">
                    <path d="M19 13H5c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1zm-7-7v4H7c-.55 0-1 .45-1 1s.45 1 1 1h5v4c0 .55.45 1 1 1s1-.45 1-1v-4h5c.55 0 1-.45 1-1s-.45-1-1-1h-5V6c0-.55-.45-1-1-1s-1 .45-1 1z"/>
                </svg>
            </button>
              <button class="smm-btn" title="演示" id="smm-demostrate-button">
    			<svg viewBox="0 0 24 24">
      				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    			</svg>
  			</button>
        </div>
        

        <!-- 分隔线 -->
        <div class="smm-divider"></div>

        <!-- 单独的功能按钮 -->
        <div class="smm-button-group">
            <button class="smm-btn" title="帮助"><a href="https://github.com/LXiangEthan/obsidian-simplemindmap">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                </a>
            </button>
            <button class="smm-btn" title="搜索" id="smm-hide-search">
    			<svg viewBox="0 0 24 24">
        			<path d="M11 19c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm8 11.41l4.3 4.29-1.41 1.42-4.3-4.29c-.78.52-1.67.88-2.69.88-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6c0 1.02-.36 1.97-.88 2.7z"/>
    			</svg>
			</button>
            <button class="smm-btn" title="列表" id="smm-list-table">
                <svg viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
            </button>
        </div>
    </div>
    
    
    
	<!--备注框-->
    <div class="smm-note-container" id="smm-input-note" style="display:none">
        <div class="smm-note-title">添加备注</div>
        <textarea class="smm-note-input" placeholder="在此输入备注内容..."></textarea>
        <div class="smm-note-counter">
            <span>字符计数: <span id="char-count">0</span>/1000</span>
            <span>最后编辑: 未保存</span>
        </div>
        <div class="smm-note-actions">
            <button class="smm-note-btn" id="smm-close-note">取消</button>
            <button class="smm-note-btn primary" id="smm-save-note">保存</button>
        </div>
    </div>
    
    
    
<!--    链接框-->
    <div class="smm-link-container" id="smm-insertLink" style="display: none">
        <div class="smm-link-title">添加链接</div>
        
        <!-- 链接类型选择 -->
        <div class="smm-link-type">
            <button class="smm-link-type-btn active" id="url-type">网页链接</button>
            <button class="smm-link-type-btn" id="obsidian-type">Obsidian文件</button>
        </div>
        
        <!-- URL链接输入 -->
        <div class="smm-link-input-container" id="url-input-container">
            <input type="text" class="smm-link-input smm-link-input-with-icon" id="smm-url-link" placeholder="https://example.com">
            <input type="text" class="smm-link-input smm-link-input-with-icon" id="smm-url-name" placeholder="name">
        </div>
        
        <!-- Obsidian文件搜索输入 -->
        <div class="smm-link-input-container" id="obsidian-input-container" style="display: none;">
            <input type="text" class="smm-link-input smm-link-input-with-icon" id="smm-search-obsidian" placeholder="搜索Obsidian文件...">
        </div>
        
        <!-- 搜索结果 -->
        <div class="smm-search-results" id="search-results">
            
        </div>
        <div class="smm-link-actions">
            <button class="smm-link-btn" id="smm-cancel-smm-link">取消</button>
            <button class="smm-link-btn primary" id="smm-add-link-button">插入链接</button>
        </div>
        

        
        </div>
<!--        标签框-->
        <div class="smm-tags-container" id="smm-tag-block" style="display: none">
        <div class="smm-tags-title">添加标签</div>

        <!-- 标签输入框组 -->
        <div class="smm-tags-input-group" id="tags-input-group">
            <div class="smm-tag-input-wrapper">
                <input type="text" class="smm-tag-input" placeholder="输入标签...">
                <div class="smm-tag-delete" title="删除">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </div>
            </div>
        </div>
		<div id="smm-tags-buttons">
        <!-- 添加标签按钮 -->
        <button class="smm-add-tag-btn" id="add-tag-btn">
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            添加标签
        </button>
        
                <!-- 退出按钮 -->
        <button class="smm-control-btn smm-exit-btn" id="exit-btn">
    		<svg class="smm-icon" viewBox="0 0 24 24" width="16" height="16">
        		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    		</svg>
    		<span>退出</span>
		</button>
        
		<button class="smm-control-btn smm-save-btn" id="save-btn">
    		<svg class="smm-icon" viewBox="0 0 24 24" width="16" height="16">
        		<path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
    		</svg>
    		<span>保存</span>
		</button>
		
		



		</div>
        <!-- 已添加的标签列表 -->
        <div class="smm-tags-list" id="tags-list">
            <!-- 示例标签 -->
        </div>
    </div>
    
    
    
    
    
    <div class="smm-search-container" style="display: none">
        <div class="smm-search-box">
            <input type="text" class="smm-search-input" placeholder="搜索..." id="searchInput">
            <button class="smm-search-btn" aria-label="搜索">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
    
            </button>
        </div>
    </div>
    
    
    
    
    
    <div class="smm-formula-editor" style="display: none">
        <div class="smm-formula-header">公式输入</div>
        <textarea class="smm-formula-input" placeholder="输入公式..."></textarea>
        <div class="smm-formula-actions">
            <button class="smm-control-btn smm-cancel-btn" id="smm-formula-cancel">
                <svg viewBox="0 0 24 24" width="14" height="14">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                取消
            </button>
            <button class="smm-control-btn smm-insert-btn" id="smm-formula-enter">
                <svg viewBox="0 0 24 24" width="14" height="14">
                    <path d="M16.59 8.59L10 15.17 7.41 12.59 6 14l4 4 8-8z"/>
                </svg>
                插入
            </button>
        </div>
    </div>
    
    
    
    
    <ul class="smm-list" style="display: none; left: 336px; top: 154px;" id="smm-list-tables">
    			<li class="smm-list-item" id="smm-import-md">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  						<polyline points="14 2 14 8 20 8" />
  						<line x1="12" y1="18" x2="12" y2="12" />
  						<line x1="9" y1="15" x2="15" y2="15" />
					</svg>
					</div>
                    <span>导入Markdown</span>
                </li>
                <li class="smm-list-item" id="smm-import-xmind">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  						<polyline points="14 2 14 8 20 8" />
  						<path d="M2 14l8-8 8 8" />
					</svg>
					</div>
                    <span>导入Xmind</span>
                </li>
                <li class="smm-list-divider"></li>
                <li class="smm-list-item" id="smm-export-svg">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<rect x="6" y="6" width="12" height="12" rx="2" />
  						<path d="M12 18v-6M12 6v6" />
					</svg>
					</div>
                    <span>导出为SVG</span>
                </li>
                <li class="smm-list-item" id="smm-export-md">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  						<rect x="8" y="2" width="8" height="4" rx="1" />
  						<path d="M8 12h8M8 16h8" />
					</svg>
					</div>
                    <span>导出为Markdown</span>
                </li>
                <li class="smm-list-divider"></li><li class="smm-list-item">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<circle cx="12" cy="12" r="3" />
  						<path d="M12 7v10" />
					</svg>
					</div>
                    <span>节点标记</span>
                </li>
                <li class="smm-list-item">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<circle cx="12" cy="12" r="5" />
  						<text x="12" y="14" font-size="12" text-anchor="middle" dominant-baseline="middle">1</text>
					</svg>
					</div>
                    <span>节点标号</span>
                </li>
                <li class="smm-list-item">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<rect x="6" y="6" width="12" height="12" rx="2" />
  						<path d="M8 10l4 4 4-4" />
					</svg>
					</div>
                    <span>插入待办</span>
                </li>
                <li class="smm-list-item">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<path d="M4 12h16M12 4v16M16 8l4 4-4 4" />
					</svg>
					</div>
                    <span>流动连线</span>
                </li>
                <li class="smm-list-item">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10zm0 16a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z" />
					</svg>
					</div>
                    <span>动量效果</span>
                </li>
                <li class="smm-list-item">
                    <div class="smm-list-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
  						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
					</svg>
					</div>
                    <span>节点链接</span>
                </li>
                </ul>
`
