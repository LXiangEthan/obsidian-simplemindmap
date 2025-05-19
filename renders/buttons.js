/**
 * @ author ethan
 * @ date  2025年05月09日 14:54
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
export const buttons = `
<div class="layui-btn-container">
<button id="createAssociativeLine">
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span>连接线</span>
</button>
  <button class="btn" id="smm-addOutLine">外框</button>
  <button class="btn" id="smm-showMap">小地图</button>
<button class="btn" id="smm-GENERALIZATION">概要</button>
<button class="btn" id="smm-setnote">备注</button>
<button class="btn" id="smm-add">增加子节点</button>
<button class="btn" id="smm-delete">删除</button>
<button class="setting-btn" id="smm-panel-button">
  <span class="bar bar1"></span>
  <span class="bar bar2"></span>
  <span class="bar bar1"></span>
</button>
</div>

<!--备注输入框-->
<div class="card" id="smm-card" style="display: none">
  <div class="card-wrapper">
    <div class="card-icon">
      <div class="icon-cart-box">
        <svg
          viewBox="0 0 512 512"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>

    <div class="card-content">
      <div class="card-title-wrapper">
        <span class="card-title">请输入你的备注</span>
        <span class="card-action" id="smm-close-note">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15"
            width="15"
            viewBox="0 0 384 512"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            ></path>
          </svg>
        </span>
      </div>
      <div class="card-text">
        <div class="form-group">
          <textarea required="" cols="50" rows="10" id="smm-textarea" name="textarea" class="smm-input-textarea"></textarea>
        </div>
      </div>
      <button type="button" class="btn-accept" id="smm-inputNote">Accept</button>
    </div>
  </div>
</div>


`
