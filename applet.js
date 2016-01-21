//gnome-screenshot+recordmydesktop applet 
//by epcosta
const Applet = imports.ui.applet;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;

function ConfirmDialog(){
    this._init();
}


function MyApplet(orientation) {
    this._init(orientation);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation) {        
        Applet.IconApplet.prototype._init.call(this, orientation);
        
        try {        
            this.set_applet_icon_symbolic_name("camera-photo-symbolic");
            this.set_applet_tooltip(_("Take a Snapshot or Record ysour Desktop"));
            
            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager.addMenu(this.menu);        
                                                                
            this._contentSection = new PopupMenu.PopupMenuSection();
            this.menu.addMenuItem(this._contentSection);                    
                                                    
          
		//Advanced Screenshot - opens gnome-screenshot
		this.menu.addAction(_("ScreenShot"), function(event) {
                Main.Util.spawnCommandLine("gnome-screenshot --interactive");
		}); 

		//Whole Screen - Dropdown Menu		
		this.screenshotItem = new PopupMenu.PopupSubMenuMenuItem(_("Whole Screen")); 
		//1 Sec Delay
		this.screenshotItem.menu.addAction(_("1 Second Delay"), function(actor, event) {
		Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screenshot.sh  --delay=1 ");
		});
		//3 Sec Delay
		this.screenshotItem.menu.addAction(_("3 Second Delay"), function(actor, event) {
		Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screenshot.sh  --delay=3");
		}); 
		//5 Sec Delay
		this.screenshotItem.menu.addAction(_("5 Second Delay"), function(actor, event) {
		Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screenshot.sh  --delay=5");
		
});  
                       
		this.menu.addMenuItem(this.screenshotItem); 



		//Current Window
		this.menu.addAction(_("Current Window"), function(event) {
                Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screenshot.sh  -w");
		}); 

		//Selected Area
		this.menu.addAction(_("Selected Area"), function(event) {
                Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screenshot.sh -a");
		});
	

	//Record My Desktop - Dropdown Menu
	this.recordItem = new PopupMenu.PopupSubMenuMenuItem(_("Record Desktop"));
	//Start Recording With Audio
	this.recordItem.menu.addAction(_("Start With Audio"), function(actor, event) {
        Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screencapture.sh");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording With-Audio");
	});
	//Start Recording No Audio
	this.recordItem.menu.addAction(_("Start No Audio"), function(actor, event) {
	Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/gnome-screenshot+recordmydesktop-applet/screencapture.sh --no-sound");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording No-Audio");
	});
	//Stop Recording
	this.recordItem.menu.addAction(_("Stop"), function(actor, event) {
	Main.Util.spawnCommandLine("killall -SIGTERM screencapture.sh");
	Main.Util.spawnCommandLine("killall recordmydesktop");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording-Stopped");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording-Finished");
	});
                       
	this.menu.addMenuItem(this.recordItem);


	//Open Recorded Video Folder
	this.menu.addAction(_("Pictures Folder"), function(actor, event) {
	Main.Util.spawnCommandLine("nemo Pictures/Screenshots");
	});  

	//Open Recorded Video Folder
	this.menu.addAction(_("Videos Folder"), function(actor, event) {
	Main.Util.spawnCommandLine("nemo Videos/Records");
	});   
                        
        }
        catch (e) {
            global.logError(e);
        }
    },
    
    on_applet_clicked: function(event) {
        this.menu.toggle();        
    },
        
    
};

function main(metadata, orientation) {  
    let myApplet = new MyApplet(orientation);
    return myApplet;      
}
