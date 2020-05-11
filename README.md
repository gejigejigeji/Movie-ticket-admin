### Movie ticket微信票务小程序

####Explain
Movie ticket是一款在线票务、购物小程序，主要针对国内海外人士在线购票的一款在线购物系统。

主要包含以下3个系统模块：

movie-ticket-wechart(小程序主体)

wx-scheme-admin(后台管理)

wx-scheme-server(后端)；

前端主要使用Vue-create脚手架开发，后端使用egg作为主要框架；小程序使用了VantUi/iViewUi等。
（了解更多相关资料点击下方链接。）


<table>
<tr>
    <th>小程序主体</th>
    <td>
    <a href="https://github.com/gejigejigeji/Movie-ticket-Wechart">https://github.com/gejigejigeji/Movie-ticket-Wechart</a>
    </td>
    <td>movie-ticket-wechart</td>
</tr>
<tr>
   <th>小程序后台管理</th>
    <td>
    <a href="https://github.com/gejigejigeji/wx-scheme-admin">https://github.com/gejigejigeji/wx-scheme-admin</a>
    </td>
    <td>当前项目</td>
</tr>
<tr>
   <th>小程序后端</th>
    <td>
    <a href="https://github.com/gejigejigeji/wx-scheme-server">
    https://github.com/gejigejigeji/wx-scheme-server</a>
    </td>
    <td>wx-scheme-server</td>
</tr>
</table>


####Example

<img src="https://raw.githubusercontent.com/gejigejigeji/Movie-ticket-Wechart/master/images-folder/view1.png" width="281px" height="609px" /> 

<img src="https://raw.githubusercontent.com/gejigejigeji/Movie-ticket-Wechart/master/images-folder/view3.png" width="281px" height="609px" /> 

####花里胡哨的Banner

<img src="https://raw.githubusercontent.com/gejigejigeji/Movie-ticket-Wechart/master/images-folder/view2.gif" width="281px" height="609px" /> 




####前端项目说明
前端采用了vue、vue-router、vueX、axios，ui使用了elementui，项目内集成了与腾讯云存储COS SDK，通过调用Api只需要传递腾讯云bucket地址和prefix即可获取图片在线链接地址。

商城系统的发布会设计到大量的增删改查和有关图片的操作，所以项目内图片上传支持图片操作，旋转、缩放、平移、裁剪与图片同比例压缩，主要采用VueCropper实现；

产品详情部分采用quill-editor富文本来编辑product detail，最终会生成Element对象保存进服务器，在小程序里使用rich-text进行渲染。