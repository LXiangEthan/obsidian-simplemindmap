# Ob-SMM -- obsidian思维导图插件

## 谁说Obsidian没有好用的思维导图插件

# 谁说Obsidian没有好用的思维导图插件

![img](https://qcnd4dl586ar.feishu.cn/space/api/box/stream/download/asynccode/?code=MDM5MmI1YmNlMDI0YzQ5NWU1Yjg5ZjgyMDA4ZDQzNGJfeEVDVVg0NVZqYk9ZaTU0RXFUWGpkRktNYzlIT1A1VWxfVG9rZW46TDFKcGJVd1Ewb0hNbmh4QnhuVmN0Zmo2bk5oXzE3NDc2NjcyMTI6MTc0NzY3MDgxMl9WNA)

通过昼夜不提的赶工，终于，在5月20之前，把最新版本发布出来了，这个版本和之前的Ob-smm-basic并不是一个插件，那个插件只实现了简单的功能，并且已经停止了功能更新，这个是从底层架构开始推倒重来的一个插件，基于==SimpleMindMap思维导图开发框架==，所以也使用的是https://wanglin2.github.io的smm文件存储。下面是SimpleMindMap的地址。可以去支持下原作者

https://wanglin2.github.io/mind-map-docs/plugins/watermark.html

# 原生支持双链

使用过Ob-SMM-basic的都知道，这个从使用的一开始就支持双链，正是因为这样的特性，所以我们在支持双链的基础上，支持了canvas嵌入（重大更新）

![img](https://qcnd4dl586ar.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDg1ODZhZjE5NWQzODRiODUxZGU1ZjkwZjU0NzE1ZWJfbHhkd3FuRFY3MkhMbFYxNlRINjNOTnlnSm9WUFVReXhfVG9rZW46SzV1UWJJNGc2b1drSTJ4c2lsYmNHQlNGbkZkXzE3NDc2NjcyMTI6MTc0NzY3MDgxMl9WNA)

和Excalidraw配置，让ob的白板正式成为一个完美的存在，一个既可以画图，也可以做思维导图的白板，谁会不爱。

> 至于大家很多人所说的，能不能支持搜索，能不能加入到入链出链中，说实话，我做过，我使用了markdown文件作为文件载体，而不是smm文件，事实是什么呢，使用markdown作为载体的方式可以使用，但也只是可以使用，会出现很多反人类的行为，比如标签页会反复刷新，同一个导图不能在两个窗口中存在，这是使用markdown的带来的影响，因为Excalidraw的代码我还没有研究明白，像这种问题我现在确实很难解决。所以我还是选择了使用smm文件，下面是md文件中的体验

# 更多功能

因为使用了强大SimpleMindMap,配合上Ob这个强大的工具，做导图简直如鱼得水，绝大多数导图有的功能它都有，只是因为现在出来还不久，众口难调，我就把最为刚需的功能给做出来了。

- 从节点样式、整体样式到链接、关联线、标签等等思绪思维导图有的功能，我基本做完了大部分
- 再到导出功能，目前还没有集成那么多，主要是事件不够了
- 最为重要的是它采用了和Excalidraw相同的思路和逻辑（不过有些地方没人家做的好），所以请大家看看在Component中的表现

![img](https://qcnd4dl586ar.feishu.cn/space/api/box/stream/download/asynccode/?code=NTQ2MjA3NjdjMWUwYzM5NTUwYTgxNDZmM2I2MzBmYTVfbUtnZmhlSktYb01UaUxEZlYzTWlvOWlCQUdpMEp0RVBfVG9rZW46SnVqbmJEa0ZCb3NTa0t4VjFLUWNQT1BTbnJmXzE3NDc2NjcyMTI6MTc0NzY3MDgxMl9WNA)

- 内链表现

![img](https://qcnd4dl586ar.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGEyNjlhYzk1NDE3YzlmNDI5OTQyOWQ1NTA5OWM4OTNfTFU3ZUpIYmREN0xDYWpCN2JadnFyZGt2TFQ4cXp4ajZfVG9rZW46RHYzcGJ4R0Iyb0g5Nll4Qmk5VWNaeDYzbnRjXzE3NDc2NjcyMTI6MTc0NzY3MDgxMl9WNA)

- 功能表现
  - 更多主题，更多结构，更多图标，还添加了包括水印，演示功能，加载动画等，它现在已经朝着功能强大的方向前进了

# 为什么不支持仓库的出入链接和原生搜索

支持仓库的出入链接必须要这个文件是markdown文件，我尝试过移植代码变成markdown存储，但是结果很明显，效果是达到了，但是带来了一系列的副作用，现在短时间内很难像Excalidraw那样把这些副作用清除干净，所以使用smm还是更好的选择

# 是否收费？

是否收费，我有时候在想不收费是不是还是对不起我这些天熬的夜，收费又觉得不好。所以我就决定除了必须收费的功能外，全部免费，为什么有些功能必须收费（手绘风格，节点标记，节点标号，插入待办，流动连线，动量效果，节点链接），可以去了解下Simplemindmap的这款框架，目前版本并不涉及这些收费功能

# 使用方式

本插件的使用方式非常简单，进入插件配置页面指定你存储的目录，不能是根目录，使用我们提供的侧边栏或者命令创建方式，这个目录是导图的自有仓库，一切外链会经过这个仓库，如果你出现了无法链接八成就是你的文件目录出现了问题。
