$(document).ready(function(){
    var $body = $('body');
    // 確認圖片讀完後
    $body.imagesLoaded(function(){
        // selector
        var $wrapper         = $('.wrapper'),
            $svg             = $wrapper.find('svg'),
            $indexBox        = $('.index-box'),
            $plateImgBox     = $('.index-box .plate-img-box'),
            $plateImg        = $plateImgBox.find('img'),
            $indexBtn        = $('#index-btn'),
            $indicatorDotBox = $('#indicator-dot'),
            $indicatorDot    = $indicatorDotBox.find('li'),
            $indicatorBtn    = $('.fa-angle-right,.fa-angle-left'),
            $SwitchPlateItem = $indexBox.add($svg),
            $navBg           = $('.nav-bg img'),
            $gifImg          = $('.gif-plate-img-box img'),
            $hamburgerBtn    = $('.hamburger-box'),
            $navBox          = $('.nav-box'),
            $contentBox      = $('.content-box'),
            $landingCut      = $('#landing-cut'),
            $lightboxTrigger = $('#light-trigger'),
            $lightboxCancel  = $('.lightbox-cancel'),
            $lightbox        = $('.lightbox');
        

        // value
        var _wrapperH       = $wrapper.outerHeight(),
            _wrapperW       = $wrapper.width(),
            _switching      = false,
            _autoPlay       = true;
        
        $hamburgerBtn.click(function(){
            $(this).find('i').toggleClass('active');
            $navBox.fadeToggle(400);
        })
        

        $lightboxTrigger.click(function(){
            $lightbox.fadeIn(500);
        })

        $lightboxCancel.click(function(){
            $lightbox.fadeOut(500);
        })
        
        // Index function
        if($plateImg.length){
            // 確認現在是哪個theme
            var _nowVal  = parseInt($wrapper.attr('key')),
                _middleH = (_wrapperH - $plateImg.height())/2 - 15;
            //處理index物件位置
            $plateImg.css({
                "padding-top": (_middleH)
            });
            
            $indexBtn.css("margin-top",_wrapperH*0.78);
            
            //slider
            $indicatorBtn.click(function(){
                var _thisValue = $(this).attr('val');
                WhitchPlate(_thisValue);
                _autoPlay = false;
            })
            
            $indicatorDot.click(function(){
                var _thisValue = $(this).index()+1;
                SwitchPlate(_thisValue);
                _autoPlay = false;
            })
            
            setInterval(function(){
                if(!_autoPlay){
                    return;
                }
                WhitchPlate(1);
            },5000)
        }
        
        else{
            SwitchPlate(_nowVal);
        }
        
        // trigger welcome
        $indexBtn.click(function(){
            $landingCut.fadeOut(500);
            $contentBox.fadeIn(500);

            _autoPlay = false;
        })
        
        
        // 計算是哪個盤子
        function WhitchPlate(val){
            var _nowVal  = parseInt($wrapper.attr('key')),
                _nextVal = _nowVal+parseInt(val);
            
            if(_nextVal == 0){
                _nextVal = 6;
            }
            
            if(_nextVal == 7){
                _nextVal = 1;
            }
            
            SwitchPlate(_nextVal);
        }
        // 換盤子啦
        function SwitchPlate(val){
            if(_switching == true){
                return;
            }
            _switching = true;
            $SwitchPlateItem.fadeOut(500,function(){
                $wrapper.removeAttr('id');
                $indicatorDot.removeAttr('class');
                $indicatorDot.eq(val-1).addClass('active');
                
                var _src = "images/landing-page/mobile"+val+".png",
                    _gifSrc = "images/landing-page/gif"+val+".gif",
                    _plateSrc = "images/welcome-page/half-palte"+val+".png";
                
                if(val == 1){ var _theme = "red-theme" }
                if(val == 2){ var _theme = "yellow-theme" }
                if(val == 3){ var _theme = "green-theme" }
                if(val == 4){ var _theme = "blue-theme" }
                if(val == 5){ var _theme = "orange-theme" }
                if(val == 6){ var _theme = "purple-theme" }

                $wrapper.attr({
                    'id':_theme,
                    'key':val
                });
                
                $plateImg.attr('src',_src);
                $navBg.attr('src',_plateSrc);
                $gifImg.attr('src',_gifSrc);
                
                $SwitchPlateItem.fadeIn(500);
                _switching = false;
            });
        }
    });  
});