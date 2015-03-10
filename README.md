# Compartmentalize

Compartmentalize is an attempt at a central page for all things the user needs, with high modularization capabilities. Written with jQuery, jQuery-ui and Bootstrap, the pages are highly responsive. That said, the base code is meant to only change to include modules, while the module files are where the power comes in, allowing the user to incorporate modules as needed without having to change the base code.

Dependencies:

        -Bootstrap
        
        -jQuery, jQuery-ui
        
        -jQuery.shapeShift


Known issues:
        
        -Google Chromecast currently creates errors in the console for the Youtube api, 
        and though they do not effect anything, can get annoying rather quickly.
        
        -In a similar vein, moving iframes, causes issues, so directly dragging the 
        Youtube iframe after it has been initialized will cause issues. Moving other 
        modules, and it moving because of them, is fine.
