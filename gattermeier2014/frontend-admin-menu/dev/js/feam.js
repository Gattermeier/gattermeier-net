/*! FEAM.js > A jQuery Front End Admin Menu, v0.3 
 *
 * Copyright 2014, Matthias Gattermeier 
 * www.gattermeier.net
 *
 * Date: 2014-06-07
 *
 * New in v0.3:
 *  > calls now via noConflict();
 *  > less DOM calls for performance increase
 *  > font-awesome integration
 */



FrontendAdminMenu = function(opt){
    var j = jQuery.noConflict();
    var defaults = { 
        Button:  '#feam-btn', 
        Content: '#feam-content',
        Menu:    '#feam-menu', 
        Panes:   '.feam-tab-pane',
        Off:     '#feam-off',
    };
    var opt = j.extend({}, defaults, opt);
    
    (opt.Links) = j(opt.Menu).find('li a');
  
    // let connect menu elements with their panes - not very elegant..
    // http://code.tutsplus.com/tutorials/14-helpful-jquery-tricks-notes-and-best-practices--net-14405
    j(opt.Links).each(function( index, element ) {
        var value = "#feam-menu-target-"+index;
        var attributeName = "data-target";
        j( this ).attr( attributeName, value );
    });
    
    j(opt.Panes).each(function( index, element ) {
        var value = "feam-menu-target-"+index;
        var attributeName = "ID";
        j( this ).attr( attributeName, value );
    });
    
    // because jQuery got rid of the beloved .toggle()
    j.fn.toggleClick = function(){
        var functions = arguments;
        return this.click(function(){
                var iteration = j(this).data('iteration') || 0;
                functions[iteration].apply(this, arguments);
                iteration = (iteration + 1) % functions.length ;
                j(this).data('iteration', iteration);
        }) ;
    };
    
    // close Menu
    closeMenu = function(target){
        if (target == 'all') {
            j(opt.Button).find('.close').hide();
            j(opt.Button).find('.open').show();
            j(opt.Content).removeClass( "feam-btn-open fullwidth" );
            j(opt.Panes).removeClass("active");            
        }

    };
    
    //open menu
    openMenu = function(target){
        if (target == 'menu') {
            j(opt.Button).find('.open').hide();
            j(opt.Button).find('.close').show();
            j(opt.Content).addClass( "feam-btn-open" );
        }
    };
    
    //open and close menu event
    j(opt.Button).toggleClick(function(){
        openMenu('menu');
        },function(){
            closeMenu('all');
    });
    
    // Push main content right when opening menu
    j(opt.Button).click(function(){
        j(opt.Off).toggleClass("push"); 
    });
    
    // Menu Links open Panes
    j(opt.Links).click(function(){
        var target = j(j(this).data("target"));
    
        target.toggleClass('active').siblings().removeClass('active');
        
        if(target.hasClass("active")){
             j(opt.Content).addClass('fullwidth');
            } else {
                j(opt.Content).removeClass('fullwidth');
                }

    });
    };