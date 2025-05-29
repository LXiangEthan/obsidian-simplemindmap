/**
 * @ author ethan
 * @ date  2025年05月24日 15:06
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
import rough from 'roughjs/bundled/rough.esm';

function svgToHandDrawn(svgElement, options = {}) {
	// 默认配置
	const config = {
		roughness: options.roughness || 1, // 手绘粗糙度
		strokeWidth: options.strokeWidth || 2, // 默认描边宽度
		fillStyle: options.fillStyle || 'hachure', // 填充风格
		...options,
	};

	// 确保传入的是 SVG 元素
	// eslint-disable-next-line no-undef
	if (!(svgElement instanceof SVGSVGElement)) {
		throw new Error('Input must be an SVG element');
	}

	// 初始化 Rough.js 的 SVG 渲染器
	const rc = rough.svg(svgElement);

	// 获取 SVG 中的所有路径和基本形状
	const elements = svgElement.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon');

	// 遍历所有元素并替换为手绘风格
	elements.forEach((elem) => {
		const roughElem = createHandDrawnElement(elem, rc, config);
		if (roughElem) {
			elem.parentNode.insertBefore(roughElem, elem);
			elem.remove(); // 移除原始元素
		}
	});

	// 返回修改后的 SVG 元素
	return svgElement;
}

// 根据元素类型创建手绘风格元素
function createHandDrawnElement(elem, rc, config) {
	const tag = elem.tagName.toLowerCase();
	let stroke = elem.getAttribute('stroke') || 'black';
	let strokeWidth = parseFloat(elem.getAttribute('stroke-width')) || config.strokeWidth;
	let fill = elem.getAttribute('fill') || 'none';

	const roughOptions = {
		stroke,
		strokeWidth,
		fill: fill !== 'none' ? fill : undefined,
		fillStyle: config.fillStyle,
		roughness: config.roughness,
	};

	switch (tag) {
		case 'path': {
			const d = elem.getAttribute('d');
			return rc.path(d, roughOptions);
		}
		case 'rect': {
			const x = parseFloat(elem.getAttribute('x')) || 0;
			const y = parseFloat(elem.getAttribute('y')) || 0;
			const width = parseFloat(elem.getAttribute('width'));
			const height = parseFloat(elem.getAttribute('height'));
			return rc.rectangle(x, y, width, height, roughOptions);
		}
		case 'circle': {
			const cx = parseFloat(elem.getAttribute('cx')) || 0;
			const cy = parseFloat(elem.getAttribute('cy')) || 0;
			const r = parseFloat(elem.getAttribute('r'));
			return rc.circle(cx, cy, r * 2, roughOptions);
		}
		case 'ellipse': {
			const cx = parseFloat(elem.getAttribute('cx')) || 0;
			const cy = parseFloat(elem.getAttribute('cy')) || 0;
			const rx = parseFloat(elem.getAttribute('rx'));
			const ry = parseFloat(elem.getAttribute('ry'));
			return rc.ellipse(cx, cy, rx * 2, ry * 2, roughOptions);
		}
		case 'line': {
			const x1 = parseFloat(elem.getAttribute('x1')) || 0;
			const y1 = parseFloat(elem.getAttribute('y1')) || 0;
			const x2 = parseFloat(elem.getAttribute('x2')) || 0;
			const y2 = parseFloat(elem.getAttribute('y2')) || 0;
			return rc.line(x1, y1, x2, y2, roughOptions);
		}
		case 'polyline':
		case 'polygon': {
			const points = elem.getAttribute('points').trim().split(/\s+/).map(p => p.split(',').map(Number));
			return tag === 'polyline'
				? rc.linearPath(points, roughOptions)
				: rc.polygon(points, roughOptions);
		}
		default:
			return null;
	}
}

export default svgToHandDrawn;
