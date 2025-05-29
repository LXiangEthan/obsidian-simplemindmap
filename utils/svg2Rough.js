/**
 * @ author ethan
 * @ date  2025年05月24日 15:15
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
import { Svg2Roughjs } from 'svg2roughjs'

export const getRough = (svg)=>{
	const svg2roughjs = new Svg2Roughjs(svg)
	svg2roughjs.svg = svg
	svg2roughjs.sketch()
}
