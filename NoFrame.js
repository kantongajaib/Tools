 var frame_check = false;
           if (self === top) {
               var JXFrame = document.getElementById("JXFrame");
               antiClickjack.parentNode.removeChild(JXFrame);
               frame_check = true;
           } else {
               top.location = self.location;
               document.write('<!--');
               window.onload = function() { document.write('can not display in frame'); }               
           }
