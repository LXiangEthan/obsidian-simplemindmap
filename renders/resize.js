/**
 * @ author ethan
 * @ date  2025年05月16日 15:38
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
export const resize_panel = (contentEl,document)=>{
	// 获取DOM元素
	const panel = contentEl.querySelector('#smm-panel-container');
	const resizeHandle = contentEl.querySelector('#smm-resizeHandle');

	// 最小宽度限制
	const minWidth = 405;

	// 记录鼠标按下时的位置和面板宽度
	let startX, startWidth;

	// 鼠标按下事件处理
	resizeHandle.addEventListener('mousedown', function(e) {
		startX = e.clientX;
		startWidth = panel.offsetWidth;

		// 添加鼠标移动和释放事件监听
		document.addEventListener('mousemove', resizePanel);
		document.addEventListener('mouseup', stopResize);

		// 防止拖动时选中文本
		e.preventDefault();
	});

	// 鼠标移动事件处理 - 调整面板宽度
	function resizePanel(e) {
		// 计算新的宽度（鼠标向右移动时宽度增加，向左移动时宽度减少）
		let width = startWidth - (e.clientX - startX);

		// 应用最小宽度限制
		width = Math.max(minWidth, width);

		// 设置面板宽度
		panel.style.width = `${width}px`;
	}

	// 鼠标释放事件处理
	function stopResize() {
		// 移除事件监听
		document.removeEventListener('mousemove', resizePanel);
		document.removeEventListener('mouseup', stopResize);
	}
}
