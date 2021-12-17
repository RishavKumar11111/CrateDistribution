import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
declare const document: any;

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

  adminPanelLinks: Array<string> = [
    "assets/template/vendor/bootstrap/css/bootstrap.css",
    `assets/template/vendor/font-awesome/css/font-awesome.min.css`,
    `assets/template/css/fontastic.css`,
    `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700`,
    `assets/template/css/grasp_mobile_progress_circle-1.0.0.min.css`,
    `assets/template/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css`,
    `assets/template/css/style.default.css`,
    `assets/template/css/custom.css`,
    `https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap`,
    `https://fonts.googleapis.com/icon?family=Material+Icons`,
    `./assets/css/fontAwesome.css`,
    `./assets/css/g-icon.css`,
];
adminPanelScripts: Array<string> = [
    "assets/template/vendor/jquery/jquery.min.js",
    "assets/template/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "assets/template/js/grasp_mobile_progress_circle-1.0.0.min.js",
    "assets/template/vendor/jquery.cookie/jquery.cookie.js",
    "assets/template/vendor/jquery-validation/jquery.validate.min.js",
    "assets/template/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
    "assets/template/js/front.js",
]

homePageLinks: Array<string> = [
  "assets/homePageTemplate/assets/css/base.css",
 "assets/homePageTemplate/assets/css/base-responsive.css",
 "assets/homePageTemplate/assets/css/grid.css",
 "assets/homePageTemplate/assets/css/font.css",
 "assets/homePageTemplate/assets/css/font-awesome.min.css",
 "assets/homePageTemplate/assets/css/flexslider.css",
 "assets/homePageTemplate/assets/css/megamenu.css",
 "assets/homePageTemplate/assets/css/print.css",
 "assets/homePageTemplate/assets/css/megamenu.css",
 "assets/homePageTemplate/theme/css/site.css",
 "assets/homePageTemplate/theme/css/site-responsive.css",
 "assets/homePageTemplate/theme/css/ma5gallery.css",
 "assets/homePageTemplate/theme/css/print.css",
];
homePageScripts: Array<string> = [
"assets/homePageTemplate/assets/js/jquery-2.1.1.min.js",
"assets/homePageTemplate/assets/js/jquery-accessibleMegaMenu.js",
"assets/homePageTemplate/assets/js/framework.js",
"assets/homePageTemplate/assets/js/jquery.flexslider.js",
"assets/homePageTemplate/assets/js/font-size.js",
"assets/homePageTemplate/assets/js/swithcer.js",
"assets/homePageTemplate/theme/js/ma5gallery.js",
"assets/homePageTemplate/assets/js/megamenu.js",
"assets/homePageTemplate/theme/js/easyResponsiveTabs.js",
"assets/homePageTemplate/theme/js/custom.js",
"assets/homePageTemplate/js/SHA-256.js",
]
  constructor() {   
    this.adminPanelLinks.forEach(e => {
      this.addCSS(e);
    })
    this.adminPanelScripts.forEach(e => {
      this.addScript(e);
    })

      this.homePageLinks.forEach(e => {
        this.removeCss(e);
      })
      this.homePageScripts.forEach(e => {
        this.removeScript(e);
      })
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {    
    return new Promise((resolve, reject) => {
        resolve(true);
    });
  }

  addScript(filename: string){
    var head = document.getElementsByTagName('body')[0];
   
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.async = false;
   
    head.append(script);
   }
   addCSS(filename: string) {
    var head = document.getElementsByTagName('head')[0];
   
    var style = document.createElement('link');
    style.href = filename;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    
    head.append(style);
   }
   removeScript(fileName: string) {
     if(document.querySelector(`[src*='${fileName}']`))
        document.querySelector(`[src*='${fileName}']`).remove();
   }
   removeCss(fileName: string) {
     if(document.querySelector(`[href*='${fileName}']`))
        document.querySelector(`[href*='${fileName}']`).remove();
   }
  
}
