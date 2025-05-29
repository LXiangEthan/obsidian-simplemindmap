/**
 * @ author ethan
 * @ date  2025年05月13日 17:52
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
export const smm_ustyle = `
<!-- 背景设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">背景</h3>
      <div class="smm-ustyle-sub-section">
        <ul class="smm-ustyle-tab-list">
          <li class="smm-ustyle-tab-item active">颜色</li>
        </ul>
        <div class="smm-ustyle-color-palette">
          <div class="smm-ustyle-color-square" style="background-color: #333;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #666;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #999;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #ccc;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f00;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #fc0;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #ff0;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #0f0;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #0fc;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #0ff;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #00f;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f0f;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #000;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #300;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #600;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #900;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #c00;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f30;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f60;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f90;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #fc3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #ff3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #0f3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #0fc3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #0ff3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #00f3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f0f3;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #f003;"></div>
          <div class="smm-ustyle-color-square" style="background-color: #ccc3;"></div>
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label" >更多颜色</label>
          <input type="color" class="smm-ustyle-color-input" id="smm-bg-color">
        </div>
      </div>
    </div>

    <!-- 连线设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">连线</h3>
      <div class="smm-ustyle-field-group">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">颜色</label>
          <input type="color" class="smm-ustyle-color-input" id="smm-ustyle-line-color" value="#1e3556">
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">粗细</label>
          <select class="smm-ustyle-select" id="smm-ustyle-line-width">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
      <div class="smm-ustyle-field-group">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">风格</label>
          <select class="smm-ustyle-select" id="smm-ustyle-line-fad">
            <option value="straight">直线</option>
            <option value="curve">曲线</option>
            <option value="direct">直连</option>
          </select>
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">圆角大小(直线模式下生效)</label>
          <select class="smm-ustyle-select" id="smm-straight-radiu">
            <option>0</option>
            <option>2</option>
            <option>5</option>
            <option>7</option>
            <option>10</option>
            <option>12</option>
            <option>15</option>
          </select>
        </div>
      </div>
        
      <div class="smm-ustyle-field-checkbox">
        <input type="checkbox" class="smm-ustyle-checkbox" id="smm-if-arrow">
        <label class="smm-ustyle-label">是否显示箭头</label>
      </div>
      <div class="smm-ustyle-sub-section">
        <h4 class="smm-ustyle-section-title" style="font-size: 14px; margin-bottom: 5px;">彩虹线条</h4>
        <div class="smm-ustyle-rainbow-line"></div>
        <button class="smm-ustyle-label" id="smm-close-rainbow">关闭彩虹条</button>
      </div>
    </div>

    <!-- 概要的连线设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">概要的连线</h3>
      <div class="smm-ustyle-field-group">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">颜色</label>
          <input type="color" class="smm-ustyle-color-input" value="#3498db" id="smm-generalize-color">
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">粗细</label>
          <select class="smm-ustyle-select" id="smm-generalize-width">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 关联线设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">关联线</h3>
      <div class="smm-ustyle-field-group">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">颜色</label>
          <input type="color" class="smm-ustyle-color-input" id="smm-associal-line" value="#000000">
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">粗细</label>
          <select class="smm-ustyle-select" id="smm-associalline-width">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
      </div>
      <div class="smm-ustyle-field-group">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">激活颜色</label>
          <input type="color" class="smm-ustyle-color-input" id="smm-associalline-active" value="#2ecc71">
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">激活粗细</label>
          <select class="smm-ustyle-select" id="smm-asocialline-active-width">
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
          </select>
        </div>
      </div>
      <div class="smm-ustyle-sub-section">
        <h4 class="smm-ustyle-section-title" style="font-size: 14px; margin-bottom: 5px;">关联线文字</h4>
        <div class="smm-ustyle-field-group">
          <div class="smm-ustyle-field">
            <label class="smm-ustyle-label">字体</label>
            <select class="smm-ustyle-select" id="smm-line-word">
              <option>宋体, SimSun, Songti SC</option>
              <option>微软雅黑, Microsoft YaHei</option>
              <option>楷体, 楷体_GB2312, SimKai, STKaiti</option>
              <option>黑体, SimHei, Heiti SC</option>
              <option>隶书, SimLi</option>
              <option>andale mono</option>
              <option>arial, helvetica, sans-serif</option>
              <option>arial black, avant garde</option>
              <option>comic sans ms</option>
              <option>impact, chicago</option>
              <option>times new roman</option>
              <option>sans-serif</option>
              <option>serif</option>
            </select>
          </div>
          <div class="smm-ustyle-field">
            <label class="smm-ustyle-label">颜色</label>
            <input type="color" class="smm-ustyle-color-input" id='smm-line-word-color' value="#000000">
          </div>
          <div class="smm-ustyle-field">
            <label class="smm-ustyle-label">字号</label>
            <select class="smm-ustyle-select" id="smm-line-word-size">
              <option>12</option>
              <option>14</option>
              <option>16</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 节点边框风格设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">节点边框风格</h3>
      <div class="smm-ustyle-field-checkbox">
        <input type="checkbox" class="smm-ustyle-checkbox" id="smm-node-border-style">
        <label class="smm-ustyle-label">是否使用只有底边框的风格</label>
      </div>
    </div>

    <!-- 节点内边距设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">节点内边距</h3>
      <div class="smm-ustyle-field-group">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">水平</label>
          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
            <input type="range" class="smm-ustyle-range" min="0" max="50" value="20" id="smm-ustyle-node-padding-x">
          </div>
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">垂直</label>
          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
            <input type="range" class="smm-ustyle-range" min="0" max="50" value="20" id="smm-ustyle-node-padding-y">
          </div>
        </div>
      </div>
    </div>


    <!-- 图标设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">图标</h3>
      <div class="smm-ustyle-field">
        <label class="smm-ustyle-label">大小</label>
        <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
          <input type="range" class="smm-ustyle-range" min="0" max="50" id="smm-imgTag-size" value="20">
        </div>
      </div>
    </div>

    <!-- 节点外边距设置 -->
    <div class="smm-ustyle-section">
      <h3 class="smm-ustyle-section-title">节点外边距</h3>
      <ul class="smm-ustyle-tab-list">
        <li class="smm-ustyle-tab-item active" id="smm-node-second">二级节点</li>
        <li class="smm-ustyle-tab-item" id="smm-node-third">三级及以下节点</li>
      </ul>
      <div class="smm-ustyle-field-group" id="smm-us-second-style">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">水平</label>
          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
            <input type="range" id="smm-node-justify-margin" class="smm-ustyle-range" min="0" max="50" value="20">
          </div>
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">垂直</label>
          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
            <input type="range" class="smm-ustyle-range" id="smm-node-vertical-margin" min="0" max="50" value="20">
          </div>
        </div>
      </div>
      <div class="smm-ustyle-field-group" id="smm-us-third-style" style="display: none">
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">水平</label>
          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
            <input type="range" class="smm-ustyle-range" id="smm-node-t-justify-margin" min="0" max="50" value="20">
          </div>
        </div>
        <div class="smm-ustyle-field">
          <label class="smm-ustyle-label">垂直</label>
          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">
            <input type="range" class="smm-ustyle-range" id="smm-node-t-vertical-margin" min="0" max="50" value="20">
          </div>
        </div>
      </div>
    </div>

    <!-- 外框内边距设置 -->
<!--    <div class="smm-ustyle-section">-->
<!--      <h3 class="smm-ustyle-section-title">外框内边距</h3>-->
<!--      <div class="smm-ustyle-field-group">-->
<!--        <div class="smm-ustyle-field">-->
<!--          <label class="smm-ustyle-label">水平</label>-->
<!--          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">-->
<!--            <input type="range" class="smm-ustyle-range" min="0" max="50" value="20" oninput="updateRangeValue(this, 'hBorderPaddingValue')">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="smm-ustyle-field">-->
<!--          <label class="smm-ustyle-label">垂直</label>-->
<!--          <div class="smm-ustyle-input" style="border: none; display: flex; align-items: center;">-->
<!--            <input type="range" class="smm-ustyle-range" min="0" max="50" value="20" oninput="updateRangeValue(this, 'vBorderPaddingValue')">-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--</div>-->
`
