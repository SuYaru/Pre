var tableWrapper=document.getElementById('table-wrapper');
var regionRatio=document.getElementById('region-radio-wrapper');
var productRatio=document.getElementById('product-radio-wrapper');
var canvasWrapper=document.getElementById('canvas');
var svgWrapper=document.getElementById('svg-wrapper');
var body = document.getElementsByTagName('body');
var save=document.getElementById('submit');
var inputs= tableWrapper.getElementsByTagName('input');
var currentTds=tableWrapper.getElementsByTagName('td');
var title=document.getElementsByClassName('list');

var judging=0;              // “商品作为第一列，地区作为第二列”默认标识
var mappingData=[];
var selectRegion=[];                    // 地区类
var selectKind=[];                      // 商品类
var globalValue=0;
        /* var regionall=document.getElementsByClassName('regionall'); */
         
        var sourceData = [{                                         // 数据源数组
            product: "手机",
            region: "华东",
            sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
        }, {
            product: "手机",
            region: "华北",
            sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
        }, {
            product: "手机",
            region: "华南",
            sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
        }, {
            product: "笔记本",
            region: "华东",
            sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
        }, {
            product: "笔记本",
            region: "华北",
            sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
        }, {
            product: "笔记本",
            region: "华南",
            sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
        }, {
            product: "智能音箱",
            region: "华东",
            sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
        }, {
            product: "智能音箱",
            region: "华北",
            sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
        }, {
            product: "智能音箱",
            region: "华南",
            sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
        }]
        
        // 地区下拉参数
        var regionData=[{
            value:1,
            text:"华东"
        },{
            value:2,
            text:"华南"
        },{
            value:3,
            text:"华北"
        }]

        // 商品下拉参数
        var productData=[{
            value:1,
            text:"手机"
        },{
            value:2,
            text:"笔记本"
        },{
            value:3,
            text:"智能音箱"
        }]

        // 定义柱子的颜色
        var barColor=new Map();
        barColor["手机"]="red";
        barColor["笔记本"]="blue";
        barColor["智能音箱"]="purple";
        
    // 页面加载时，自动生成 checkbox
    window.onload=function(){
        generateCheckBoxs(regionRatio,regionData);
        generateCheckBoxs(productRatio,productData);
        gethover();
    }