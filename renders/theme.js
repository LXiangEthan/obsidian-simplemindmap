/**
 * @ author ethan
 * @ date  2025年05月13日 15:46
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
const url = 'https://mindmap.ethanliang.top/dist/img/'
export const smm_theme = `

        <select class="smm-select" id="theme-category-select">
            <option value="all">全部</option>
            <option value="light">经典</option>
            <option value="dark">深色</option>
            <option value="minimal">朴素</option>
        </select>

        <!-- 浅色主题 -->
        <div class="smm-category-title" id="light-category">经典主题</div>
        <div class="smm-themes-grid" id="light-themes">
            <div class="smm-theme-card" themeCal="classic15">
                <div class="smm-theme-image" style="background-image: url('${url+"classic15.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典15</div>
                    <div class="smm-theme-desc">蓝灰色配色经典</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic14">
                <div class="smm-theme-image" style="background-image: url('${url+"classic14.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典14</div>
                    <div class="smm-theme-desc">圆形节点、黄色主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic13">
                <div class="smm-theme-image" style="background-image: url('${url+"classic13.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典13</div>
                    <div class="smm-theme-desc">黄蓝白主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic12">
                <div class="smm-theme-image" style="background-image: url('${url+"classic12.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典12</div>
                    <div class="smm-theme-desc">绿白主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic11">
                <div class="smm-theme-image" style="background-image: url('${url+"classic11.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典11</div>
                    <div class="smm-theme-desc">蓝黄白主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic10">
                <div class="smm-theme-image" style="background-image: url('${url+"classic10.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典10</div>
                    <div class="smm-theme-desc">灰黄主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic9">
                <div class="smm-theme-image" style="background-image: url('${url+"classic9.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典9</div>
                    <div class="smm-theme-desc">黄色主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic8">
                <div class="smm-theme-image" style="background-image: url('${url+"classic8.png"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典8</div>
                    <div class="smm-theme-desc">蓝绿主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic7">
                <div class="smm-theme-image" style="background-image: url('${url+"classic7.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典7</div>
                    <div class="smm-theme-desc">红蓝主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic6">
                <div class="smm-theme-image" style="background-image: url('${url+"classic6.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典6</div>
                    <div class="smm-theme-desc">黑黄主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic5">
                <div class="smm-theme-image" style="background-image: url('${url+"classic5.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典5</div>
                    <div class="smm-theme-desc">紫绿主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="classic4">
                <div class="smm-theme-image" style="background-image: url('${url+"classic4.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">脑图经典4</div>
                    <div class="smm-theme-desc">灰绿主题</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="cactus">
                <div class="smm-theme-image" style="background-image: url('${url+"cactus.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">仙人掌</div>
                    <div class="smm-theme-desc">绿色可爱</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="morandi">
                <div class="smm-theme-image" style="background-image: url('${url+"morandi.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">莫兰迪</div>
                    <div class="smm-theme-desc">红酒红色</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="seaBlueLine">
                <div class="smm-theme-image" style="background-image: url('${url+"seaBlueLine.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">海蓝线</div>
                    <div class="smm-theme-desc">大海我来了</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="rose">
                <div class="smm-theme-image" style="background-image: url('${url+"rose.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">玫瑰</div>
                    <div class="smm-theme-desc">爱的热烈</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="lemonBubbles">
                <div class="smm-theme-image" style="background-image: url('${url+"lemonBubbles.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">柠檬气泡</div>
                    <div class="smm-theme-desc">小清新</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="shallowSea">
                <div class="smm-theme-image" style="background-image: url('${url+"shallowSea.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">浅海</div>
                    <div class="smm-theme-desc">可惜没有沙滩</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="oreo">
                <div class="smm-theme-image" style="background-image: url('${url+"oreo.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">奥利奥</div>
                    <div class="smm-theme-desc">扭一扭，泡一泡</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="autumn">
                <div class="smm-theme-image" style="background-image: url('${url+"autumn.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">秋天</div>
                    <div class="smm-theme-desc">又是一年秋凉，人生几度昏黄</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="avocado">
                <div class="smm-theme-image" style="background-image: url('${url+"avocado.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">牛油果</div>
                    <div class="smm-theme-desc">没吃过、好像很贵</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="redSpirit">
                <div class="smm-theme-image" style="background-image: url('${url+"redSpirit.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">红色精神</div>
                    <div class="smm-theme-desc">我们都是共产主义接班人</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="coffee">
                <div class="smm-theme-image" style="background-image: url('${url+"coffee.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">咖啡</div>
                    <div class="smm-theme-desc">咖啡渐渐变浓，你又迷人又美</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="courseGreen.jpg">
                <div class="smm-theme-image" style="background-image: url('${url+"courseGreen.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">课程绿</div>
                    <div class="smm-theme-desc">我也不知道为什么叫这</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="simpleBlack">
                <div class="smm-theme-image" style="background-image: url('${url+"simpleBlack.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">简约黑</div>
                    <div class="smm-theme-desc">黑色庄重且优雅</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="minions">
                <div class="smm-theme-image" style="background-image: url('${url+"minions.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">小黄人</div>
                    <div class="smm-theme-desc">奶爸，是你吗奶爸</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="greenLeaf">
                <div class="smm-theme-image" style="background-image: url('${url+"greenLeaf.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">清新绿叶</div>
                    <div class="smm-theme-desc">春天到了</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="vitalityOrange">
                <div class="smm-theme-image" style="background-image: url('${url+"vitalityOrange.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">活力橙</div>
                    <div class="smm-theme-desc">每天都要加油我</div>
                </div>
            </div>
            <div class="smm-theme-card" themeCal="gold">
                <div class="smm-theme-image" style="background-image: url('${url+"gold.jpg"}')"></div>
                <div class="smm-theme-info">
                    <div class="smm-theme-title">金色vip</div>
                    <div class="smm-theme-desc">嗯，朕许了</div>
                </div>
            </div>
        </div>

        <!-- 深色主题 -->
        <div class="smm-category-title" id="dark-category">深色主题</div>
        <div class="smm-themes-grid" id="dark-themes">
            <div class="smm-theme-card" themeCal="dark7">
    <div class="smm-theme-image" style="background-image: url('${url+"dark7.png"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色7</div>
        <div class="smm-theme-desc">暗色7主题，带来神秘深沉的视觉感受。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="dark6">
    <div class="smm-theme-image" style="background-image: url('${url+"dark6.png"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色6</div>
        <div class="smm-theme-desc">暗色6主题，展现低调而优雅的氛围。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="dark5">
    <div class="smm-theme-image" style="background-image: url('${url+"dark5.png"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色5</div>
        <div class="smm-theme-desc">暗色5主题，营造出静谧而深邃的环境。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="dark4">
    <div class="smm-theme-image" style="background-image: url('${url+"dark4.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色4</div>
        <div class="smm-theme-desc">暗色4主题，传递出沉稳而内敛的格调。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="dark3">
    <div class="smm-theme-image" style="background-image: url('${url+"dark3.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色3</div>
        <div class="smm-theme-desc">暗色3主题，凸显出独特的暗黑魅力。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="dark2">
    <div class="smm-theme-image" style="background-image: url('${url+"dark2.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色2</div>
        <div class="smm-theme-desc">暗色2主题，打造出简洁而冷峻的视觉效果。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="dark">
    <div class="smm-theme-image" style="background-image: url('${url+"dark.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗色</div>
        <div class="smm-theme-desc">暗色主题，诠释纯粹的黑暗美学。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="darkNightLceBlade">
    <div class="smm-theme-image" style="background-image: url('${url+"darkNightLceBlade.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">暗夜冰刃</div>
        <div class="smm-theme-desc">暗夜冰刃主题，仿佛能感受到丝丝寒意的凌厉风格。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="neonLamp">
    <div class="smm-theme-image" style="background-image: url('${url+"neonLamp.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">霓虹灯</div>
        <div class="smm-theme-desc">霓虹灯主题，充满科技感和时尚的霓虹灯光效果。</div>
    </div>
</div>
<div class="smm-theme-info" themeCal="orangeJuice">
	<div class="smm-theme-image" style="background-image: url('${url+"orangeJuice.jpg"}')"></div>
    <div class="smm-theme-title">橙汁</div>
    <div class="smm-theme-desc">橙汁主题，洋溢着活力和清新的橙色调。</div>
</div>
<div class="smm-theme-card" themeCal="blackGold">
    <div class="smm-theme-image" style="background-image: url('${url+"blackGold.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">黑金</div>
        <div class="smm-theme-desc">黑金主题，彰显奢华与高贵的质感。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="lateNightOffice">
    <div class="smm-theme-image" style="background-image: url('${url+"lateNightOffice.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">深夜办公室</div>
        <div class="smm-theme-desc">深夜办公室主题，展现安静专注的办公氛围。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="blackHumour">
    <div class="smm-theme-image" style="background-image: url('${url+"blackHumour.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">黑色幽默</div>
        <div class="smm-theme-desc">黑色幽默主题，带有些许诙谐的暗黑风格。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="classic">
    <div class="smm-theme-image" style="background-image: url('${url+"classic.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">脑图经典</div>
        <div class="smm-theme-desc">脑图经典主题，经典的风格适用于高效的思维导图场景。</div>
    </div>
</div>
        </div>

        <!-- 朴素主题 -->
        <div class="smm-category-title" id="minimal-category">朴素主题</div>
        <div class="smm-themes-grid" id="minimal-themes">
           <div class="smm-theme-card" themeCal="classic3">
    <div class="smm-theme-image" style="background-image: url('${url+"classic3.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">脑图经典3</div>
        <div class="smm-theme-desc">脑图经典3主题，独特的风格为思维导图增添新的视觉体验。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="classic2">
    <div class="smm-theme-image" style="background-image: url('${url+"classic2.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">脑图经典2</div>
        <div class="smm-theme-desc">脑图经典2主题，简洁的设计让思维导图更易阅读和理解。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="mint">
    <div class="smm-theme-image" style="background-image: url('${url+"mint.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">薄荷</div>
        <div class="smm-theme-desc">薄荷主题，清新的色调为思维导图带来凉爽的感觉。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="pinkGrape">
    <div class="smm-theme-image" style="background-image: url('${url+"pinkGrape.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">粉红葡萄</div>
        <div class="smm-theme-desc">粉红葡萄主题，甜美的色调使思维导图充满活力。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="romanticPurple">
    <div class="smm-theme-image" style="background-image: url('${url+"romanticPurple.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">浪漫紫</div>
        <div class="smm-theme-desc">浪漫紫主题，优雅的紫色调营造出浪漫的思维导图氛围。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="freshRed">
    <div class="smm-theme-image" style="background-image: url('${url+"freshRed.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">清新红</div>
        <div class="smm-theme-desc">清新红主题，明亮的红色让思维导图更醒目。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="freshGreen">
    <div class="smm-theme-image" style="background-image: url('${url+"freshGreen.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">清新绿</div>
        <div class="smm-theme-desc">清新绿主题，充满生机的绿色调使思维导图富有活力。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="earthYellow">
    <div class="smm-theme-image" style="background-image: url('${url+"earthYellow.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">泥土黄</div>
        <div class="smm-theme-desc">泥土黄主题，温暖的黄色调为思维导图带来质朴的感觉。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="brainImpairedPink">
    <div class="smm-theme-image" style="background-image: url('${url+"brainImpairedPink.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">脑残粉</div>
        <div class="smm-theme-desc">脑残粉主题，独特的粉色调让思维导图别具一格。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="blueSky">
    <div class="smm-theme-image" style="background-image: url('${url+"blueSky.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">天空蓝</div>
        <div class="smm-theme-desc">天空蓝主题，纯净的蓝色调让思维导图仿佛置身于蓝天之下。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="classicBlue">
    <div class="smm-theme-image" style="background-image: url('${url+"classicBlue.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">经典蓝</div>
        <div class="smm-theme-desc">经典蓝主题，沉稳的蓝色使思维导图更具专业感。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="classicGreen">
    <div class="smm-theme-image" style="background-image: url('${url+"classicGreen.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">经典绿</div>
        <div class="smm-theme-desc">经典绿主题，经典的绿色调赋予思维导图自然的气息。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="skyGreen">
    <div class="smm-theme-image" style="background-image: url('${url+"skyGreen.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">天清绿</div>
        <div class="smm-theme-desc">天清绿主题，清新的绿色营造出宁静的思维导图环境。</div>
    </div>
</div>
<div class="smm-theme-card" themeCal="default">
    <div class="smm-theme-image" style="background-image: url('${url+"default.jpg"}')"></div>
    <div class="smm-theme-info">
        <div class="smm-theme-title">默认主题</div>
        <div class="smm-theme-desc">默认主题，简洁通用的风格适合各种思维导图场景。</div>
    </div>
</div>
        </div>

`
