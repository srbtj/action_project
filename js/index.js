window.onload = function(){
    var doc = document,
        oWrap = getByClass(doc,'wrap'),
        oHeader = $('header'),
        oHeaderLeft = 0,
        oHeadMain = getByClass(oHeader,'headMain')[0],
        oNav = $('nav'),
        oNavA = oNav.getElementsByTagName('a'),
        oArrow = getByClass(oHeader,'arrow')[0],
        oContent = $('content'),
        cUl = getByClass(oContent,'list')[0],
        cLi = getByClass(cUl,'liList'),
        iNow = 3,
        iContentHeight = 0,
        cDiv = getByClass(cUl,'show_ctx');

    init();

    /** resize page  */
    window.onresize = function(){
        init();
    }

    /***
     *  get element by id
     * @param id
     * @returns {Element}
     */
    function $(id){
        return document.getElementById(id);
    }
    /***
     *  init load data
     */
    function init(){

        oHeaderLeft = oHeadMain.offsetLeft;
        iContentHeight = (viewHeight() - oHeader.offsetHeight)/16;
        /** set id="content" height **/
        oContent.style.height = iContentHeight + 'rem';
        for(var i= 0,len=cLi.length;i<len;i++){
            cLi[i].style.height = iContentHeight + 'rem';
        }
        /** set ul top value */


        divHeightAuto();
        arrowLeft();
        startMove();
        wheelScroll();

    }

    function arrowLeft(){

        for(var i= 0,len=oNavA.length;i<len;i++){
            oNavA[i].index = i;
            oNavA[i].onclick = function(){
                for(var j= 0;j<len;j++){
                    oNavA[j].className = '';
                }
                this.className = 'active';
                iNow = this.index;
                arrowMove(this);
            }
        }
    }

    function startMove(){
        arrowMove(oNavA[iNow]);
        for(var j= 0,len=oNavA.length;j<len;j++){
            oNavA[j].className = '';
        }

        oNavA[iNow].className = 'active';
    }
    /***
     *
     * @param obj
     */
    function arrowMove(obj){
        var defaultVal = obj.offsetWidth/2 - oArrow.offsetWidth/ 2,
            iLeft = getPosition(obj).left;
        oArrow.style.left = iLeft - oHeaderLeft + defaultVal + 'px';
        cUl.style.top = -(iNow*iContentHeight) + 'rem';
    }


    /**
     *
     */
    function wheelScroll(){
        /** ie and chrome
                oContent.onmousewheel = function(){};

            firefox  使用事件监听
                oContent.addEventListener('DOMMouseScroll',fn,false);
         */

        var flag = true, /** true : down ; false : up */
            timer = null;
        if(oContent.addEventListener){
            oContent.addEventListener('DOMMouseScroll',function(ev){
                clearTimeout(timer);
                ev = ev || window.event;
                timer = setTimeout(function(){
                    fn(ev);
                },200);
            },false);
        }
        oContent.onmousewheel = function(ev){
            clearTimeout(timer);
            ev = ev || window.event;
            timer = setTimeout(function(){
                fn(ev);
            },200)
        };

        function fn(ev){

            if(ev.wheelDelta){ /** chrome */
                //console.info( ev.wheelDelta);
                flag = ev.wheelDelta<0?true:false;
            }else{
                //console.info( ev.detail );
                flag = ev.detail>0?true:false;
            }

            if(flag){
                if(iNow < oNavA.length-1){
                    iNow++;
                }
            }else{
                if(iNow > 0){
                    iNow--;
                }
            }

            startMove();
        }
    }

    /***
     *  show content height;
     */
    function divHeightAuto(){
        var divHeight = 0,
            styleVal = getStyle(cDiv[0],'height');
        if(styleVal.indexOf('em')>-1){
            divHeight = parseFloat(styleVal)*16;
        }else{
            divHeight = parseFloat(styleVal);
        };
        var  marginTop = (iContentHeight - divHeight/16)/2;
        for(var i= 0,len=cDiv.length;i<len;i++){
            cDiv[i].style.marginTop = marginTop + 'rem';
        }

    }
    /****
     *  get element by class
     * @param iParent
     * @param iClass
     * @returns {Array}
     */
    function getByClass(iParent,iClass){

        var obj = iParent.getElementsByTagName('*'),
            arr = [];
        for(var i= 0,iLen=obj.length;i<iLen;i++){

            var classArr = obj[i].className ? obj[i].className.split(' ') : [];

            for(var j= 0,jLen=classArr.length;j<jLen;j++){

                if(classArr[j] === iClass){
                    arr.push(obj[i]);
                    break;
                }
            }
        }
        return arr;
    }
    /***
     *  view width
     * @returns {Number|number}
     */
    function viewWidth(){
        return window.innerWidth || document.documentElement.clientWidth;
    }
    /**
     *  view height
     * @returns {Number|number}
     */
    function viewHeight(){
        return window.innerHeight || document.documentElement.clientHeight;
    }

    /***
     *  set li background
     * @param iArr
     * @param iWidth
     */
    //function setBackground(iArr,iWidth){
    //
    //    var width = iWidth;
    //    for(var i= 0,len=iArr.length;i<len;i++){
    //        iArr[i].style.left = '50%';
    //        iArr[i].style.width = width + 'px';
    //        iArr[i].style.marginLeft = '-' + Math.ceil(width/2) + 'px';
    //    }
    //}

    /***
     *  get element attr value
     * @param obj
     * @param attr
     * @returns {*}
     */
    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return window.getComputedStyle(obj,null)[attr];
        }
    }

    function getPosition(obj){
        var iLeft = 0,iTop = 0,
            temp = {
                left : 0,
                top : 0
            };
        while(obj){
            temp.left += obj.offsetLeft;
            temp.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return temp;
    }
}