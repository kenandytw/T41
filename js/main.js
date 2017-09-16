$(document).ready(function(){
    var $body = $('body');
    
    var images = new Array()
    function preload() {
        for (i = 0; i < preload.arguments.length; i++) {
            images[i] = new Image()
            images[i].src = preload.arguments[i]
        }
    }
    preload(
        "http://domain.tld/gallery/image-001.jpg",
        "http://domain.tld/gallery/image-002.jpg",
        "http://domain.tld/gallery/image-003.jpg"
    );
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
            $lightboxTrigger = $('#light-trigger'),
            $lightboxCancel  = $('.lightbox-cancel'),
            $lightbox        = $('.lightbox');

        // value
        var _wrapperH       = $wrapper.outerHeight(),
            _wrapperW       = $wrapper.width(),
            _switching      = false,
            _autoPlay       = true;
        
        $('#toIdea').click(function(){
            var $body = $('.content-box > div');

            $body.animate({
                scrollTop: $('#idea').offset().top - 50
            }, 700);
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
            var _nowVal  = parseInt($wrapper.attr('key'));
            
            //處理index物件位置
            $plateImg.css({
                "height": ( _wrapperH*0.9 ),
                "padding-top": (_wrapperH*0.1)
            });
            
            $indexBtn.css("margin-top",_wrapperH*0.67);
            
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
            },6000)
        }
        
        else{
            SwitchPlate(_nowVal);
        }
        
        // trigger welcome
        $indexBtn.click(function(){
            $wrapper.addClass('welcome');
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
                
                var _src = "images/landing-page/set"+val+".png",
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