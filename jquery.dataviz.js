/*!
 * jQuery DataViz Plugin
 * version: 1.0 (30-MAY-2013)
 * @requires jQuery v1.5 or later
 * @ author: Cseh Arpad, arpad.cseh@gmail.com
 * Project repository: https://github.com/arpadcseh/dataviz
 */
(function($) {
    $.DataViz = function(element, options) {
        var defaults = {
            values: null,
            total: 0,
            loop: 0,
            colors: ['#397EF5','#63B8E2','#989E2B','#BEBF40'],
        }

        var plugin = this;
        plugin.settings = {}
        var $element = $(element);
        // calculate total amount
        plugin.init = function() {
            var o = options, t = 0;
            for (var j = 0; j < o.values.length; j++) {
				t += (typeof o.values[j] == 'number') ? o.values[j] : 0;
			}		
			o.total = t;
			o.loop = o.values.length;			
            plugin.settings = $.extend(defaults, options);
        }

        plugin.draw_pie = function() {
        	var o = plugin.settings,
        		piece, 
        		piece_ctx, 
        		lastend = 0, 
        		i = 0;	
        	$element.html('');	
			for (i; i<o.loop; i++){		
				//create pieces
				$element.append('<canvas id="piece_'+i+'" class="pieces" width="300" height="300"></canvas>');
				piece = document.getElementById('piece_'+i);
				piece_ctx = piece.getContext("2d");
				piece_ctx.clearRect(0, 0, piece.width, piece.height);
				piece_ctx.fillStyle = o.colors[i];
				piece_ctx.beginPath();
				piece_ctx.moveTo(150,150);
				piece_ctx.arc(150,150,120,lastend,lastend+(Math.PI*2*(o.values[i]/o.total)),false);
				piece_ctx.lineTo(150,150);
				piece_ctx.fill();
				lastend += Math.PI*2*(o.values[i]/o.total);
			}
        }

        plugin.draw_bar = function(){
        	var o = plugin.settings,
        		piece, 
        		piece_ctx, 
        		lastend = 0, 
        		i = 0;	
			$element.html('');
			for (i; i<o.loop; i++) {	    
				var x = (60*i)+30;
				// create bars and tooltips
				$element.append('<canvas id="bar_'+i+'" class="bars" style="left:'+x+'px" width="50" height="300"></canvas>');
				$element.append('<canvas id="bar_tooltip_'+i+'" class="bar_tooltips" style="left:'+x+'px" width="50" height="300"></canvas>');
				var bar = document.getElementById('bar_'+i),
					bar_ctx = bar.getContext("2d"),
					bar_tooltip = document.getElementById('bar_tooltip_'+i),
					bar_tooltip_ctx = bar_tooltip.getContext("2d"),			
			    	bar_height = (bar.height-60)*(o.values[i]/o.total);

				bar_ctx.clearRect(0, 0, bar.width, bar.height);
				bar_ctx.fillStyle = o.colors[i];
		    	bar_ctx.fillRect(0,270,50,-(bar_height));
			    bar_ctx.fill();	
			    bar_tooltip_ctx.moveTo(0,0);

		    	bar_tooltip_ctx.font = '12pt Arial';  
		    	bar_tooltip_ctx.shadowColor = '#ccc';
			    bar_tooltip_ctx.shadowBlur = 4;
			    bar_tooltip_ctx.shadowOffsetX = 2;
			    bar_tooltip_ctx.shadowOffsetY = 2;  	
		    	bar_tooltip_ctx.fillStyle = o.colors[i];    	
		      	bar_tooltip_ctx.fillText(o.values[i], 15,(300-bar_height-35));
		      	// tooltip animation
		      	$("#bar_"+i).hover(function(){
					$(this).next('canvas').slideToggle(300);		
				});
			}	
        }
        plugin.init();
    }
    $.fn.DataViz = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('DataViz')) {
                var plugin = new $.DataViz(this, options);
                $(this).data('DataViz', plugin);
            }else{
            	$(this).removeData('DataViz');
            	var plugin = new $.DataViz(this, options);
                $(this).data('DataViz', plugin);
            }
        });
    }
})(jQuery);