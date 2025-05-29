/**
 * @ author ethan
 * @ date  2025年05月13日 17:37
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
export const smm_nodestyle = `

<!-- 文字设置 -->
    <div class="smm-nodestyle-section">
      <div class="smm-nodestyle-title">文字</div>
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">字体</label>
          <select class="smm-nodestyle-select" id="smm-node-word-zt">
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
  
      </div>
      
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">字号</label>
          <select class="smm-nodestyle-select" id="smm-node-word-zh">
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>24</option>
            <option>32</option>
            <option>48</option>
          </select>
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">颜色</label>
          <input type="color" class="smm-nodestyle-input" id="smm-nodestyle-bgcolor" value="#333333" id="smm-node-word-ys">
        </div>
      <div class="smm-nodestyle-stylebuttons">
        <button class="smm-nodestyle-button smm-nodestyle-bold">B</button>
        <button class="smm-nodestyle-button smm-nodestyle-italic">I</button>
        <button class="smm-nodestyle-button smm-nodestyle-underline">U</button>
        <button class="smm-nodestyle-button" id="smm-clear-s">S</button>
      </div>
		</div>
    </div>

    <!-- 边框设置 -->
    <div class="smm-nodestyle-section">
      <div class="smm-nodestyle-title">边框</div>
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">颜色</label>
          <input type="color" class="smm-nodestyle-input" id="smm-nodestyle-border-color" value="#1e3556">
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">样式</label>
          <select class="smm-nodestyle-select" id="smm-nodestyle-line">
            <option value="none">实线</option>
            <option value="5,5">虚线</option>
          </select>
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">宽度</label>
          <select class="smm-nodestyle-select" id="smm-nodestyle-line-width">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">圆角</label>
          <select class="smm-nodestyle-select" id="smm-nodestyle-roundRadiu">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 背景设置 -->
    <div class="smm-nodestyle-section">
      <div class="smm-nodestyle-title">背景</div>
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">颜色</label>
          <input type="color" class="smm-nodestyle-input" id="smm-nodestyle-bgcolor-bg">
        </div>
<!--        <div class="smm-nodestyle-field">-->
<!--          <label class="smm-nodestyle-label">透明度</label>-->
<!--          <select class="smm-nodestyle-select">-->
<!--            <option>100%</option>-->
<!--            <option>80%</option>-->
<!--            <option>60%</option>-->
<!--            <option>40%</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div class="smm-nodestyle-field">-->
<!--          <label class="smm-nodestyle-label">渐变</label>-->
<!--          <select class="smm-nodestyle-select">-->
<!--            <option>无</option>-->
<!--            <option>水平</option>-->
<!--            <option>垂直</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div class="smm-nodestyle-field">-->
<!--          <label class="smm-nodestyle-label">颜色2</label>-->
<!--          <input type="color" class="smm-nodestyle-input">-->
<!--        </div>-->
      </div>
    </div>

    <!-- 形状设置 -->
    <div class="smm-nodestyle-section">
      <div class="smm-nodestyle-title">形状</div>
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">形状</label>
          <select class="smm-nodestyle-select" id="smm-node-shape">
            <option value="rectangle">矩形</option>
            <option value="diamond">菱形</option>
            <option value="parallelogram">平行四边形</option>
            <option value="roundedRectangle">圆角矩形</option>
            <option value="octagonalRectangle">八角矩形</option>
            <option value="outerTriangularRectangle">外三角矩形</option>
            <option value="innerTriangularRectangle">内三角矩形</option>
            <option value="ellipse">椭圆</option>
            <option value="circle">圆</option>
          </select>
        </div>
<!--        <div class="smm-nodestyle-field">-->
<!--          <label class="smm-nodestyle-label">大小</label>-->
<!--          <div class="smm-nodestyle-input" style="border: none; padding: 0; display: flex; align-items: center;">-->
<!--            <input type="range" class="smm-nodestyle-input" min="50" max="200" value="100" style="flex: 1;">-->
<!--            <span style="margin-left: 4px;">100%</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

    <!-- 线条设置 -->
    <div class="smm-nodestyle-section">
      <div class="smm-nodestyle-title">线条</div>
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">颜色</label>
          <input type="color" class="smm-nodestyle-input" id="smm-nodeline-color" value="#1e3556">
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">样式</label>
          <select class="smm-nodestyle-select" id="smm-node-ys-style">
            <option value="none">实线</option>
            <option value="5,5,1,5">虚线</option>
          </select>
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">宽度</label>
          <select class="smm-nodestyle-select" id="smm-node-line-width">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
<!--        <div class="smm-nodestyle-field">-->
<!--          <label class="smm-nodestyle-label">箭头</label>-->
<!--          <select class="smm-nodestyle-select">-->
<!--            <option>无</option>-->
<!--            <option>头部</option>-->
<!--            <option>尾部</option>-->
<!--            <option>两端</option>-->
<!--          </select>-->
<!--        </div>-->
      </div>
    </div>

    <!-- 节点内边距 -->
    <div class="smm-nodestyle-section">
      <div class="smm-nodestyle-title">节点内边距</div>
      <div class="smm-nodestyle-subsection">
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">水平</label>
          <div class="smm-nodestyle-input" style="border: none; padding: 0; display: flex; align-items: center;">
            <input type="range" class="smm-nodestyle-input" id="smm-nodestyle-justify-padding" min="0" max="30" value="10" style="flex: 1;">
          </div>
        </div>
        <div class="smm-nodestyle-field">
          <label class="smm-nodestyle-label">垂直</label>
          <div class="smm-nodestyle-input" style="border: none; padding: 0; display: flex; align-items: center;">
            <input type="range" class="smm-nodestyle-input" id="smm-nodestyle-vertical-padding" min="0" max="30" value="5" style="flex: 1;">
          </div>
        </div>
      </div>
    </div>

`
