import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase";
import {
  DomSanitizer,
  SafeResourceUrl,
  Title
} from "@angular/platform-browser";

declare var require: any;
declare var $: any;

let vCards = require("vcards-js");

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [Title]
})
export class ProfileComponent implements OnInit {
  showDialog = false;
  public profilename: any = "";
  private sub: any;
  public profiledbdetails: any;
  public profiledetails: any;
  public loaded: any;
  public youtubeurl: any;
  public slideurl: any;
  public primarycontact: any;

  constructor(
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    private title: Title,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private meta: Meta
  ) {
    const that = this;
    const category = this.route.snapshot.params["id"];
    this.sub = this.route.params.subscribe(params => {
      this.profilename = params["id"]; // (+) converts string 'id' to a number
      this.profiledbdetails = this.db.object("/" + this.profilename);
      this.profiledbdetails.subscribe(res => {
        this.profiledetails = res; 
        console.log(res)
        this.youtubeurl = this.cleanURL();
        this.slideurl = this.cleanSlideURL();
        this.primarycontact = this.cleanPhone();
        if (res && res.name) {
          console.log("no user found");
        }
        this.loaded = true;
        this.meta.addTag({
          property: "title",
          content:
            that.profiledetails["firstname"] +
            " " +
            that.profiledetails["lastname"] +
            " - " +
            that.profiledetails["designation"]
        });
        this.meta.addTag({
          property: "og:title",
          content:
            that.profiledetails["firstname"] +
            " " +
            that.profiledetails["lastname"] +
            " - " +
            that.profiledetails["designation"]
        });
        this.meta.addTag({
          property: "twitter:title",
          content:
            that.profiledetails["firstname"] +
            " " +
            that.profiledetails["lastname"] +
            " - " +
            that.profiledetails["designation"]
        });
        this.meta.addTag({
          property: "twitter:text:title",
          content:
            that.profiledetails["firstname"] +
            " " +
            that.profiledetails["lastname"] +
            " - " +
            that.profiledetails["designation"]
        });

        this.meta.addTag({
          property: "description",
          content: that.profiledetails["description"]
        });
        this.meta.addTag({
          property: "og:description",
          content: that.profiledetails["description"]
        });
        this.meta.addTag({
          property: "twitter:description",
          content: that.profiledetails["description"]
        });

        this.meta.addTag({
          property: "og:image",
          content: that.profiledetails["profilepic"]
        });
        this.meta.addTag({
          property: "twitter:image:src",
          content: that.profiledetails["profilepic"]
        });
        this.meta.addTag({
          property: "twitter:image",
          content: that.profiledetails["profilepic"]
        });

        this.meta.addTag({ property: "og:type", content: "My Profile" });
        this.meta.addTag({ property: "og:url", content: window.location.href });
      });
    });
  }
  ngOnInit() {}
  loadSocialPlugins() {
    const that = this;
    setTimeout(function() {
      $("#shareIcons").jsSocials({
        url: window.location.href,
        text:
          "Sharing digital card of " +
          that.profiledetails["firstname"] +
          ", " +
          that.profiledetails["designation"]+
          ", " +
          that.profiledetails["companyname"],
        showLabel: false,
        showCount: false,
        shares: ["email", "whatsapp"]
      });
    }, 500);
  }
  callshare() {
    this.showDialog = true;
    this.loadSocialPlugins();
  }
  cleanURL() {
    const url = this.profiledetails["youtubeurl"];
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  cleanSlideURL() {
    const url = this.profiledetails["slideshareurl"];
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  cleanPhone() {
    const url = this.profiledetails["primarycontact"];
    return this.sanitizer.bypassSecurityTrustResourceUrl("sms:" + url);
  }
  mobileShare() {
    if(!this.profiledetails || !this.profiledetails['firstname']){
      return;
    }
    const url = "Sharing digital card of " +
    this.profiledetails["firstname"] +
    ", " +
    this.profiledetails["designation"].replace('&',' ') +
    ", "+
    this.profiledetails["companyname"] +
    ". "+window.location.href;
    return this.sanitizer.bypassSecurityTrustResourceUrl("sms:?&body=" + url);
  }
  downLoadvCard() {
    const vCard = vCards();
    vCard.firstName = this.profiledetails["firstname"];
    vCard.middleName = "";
    vCard.lastName = this.profiledetails["lastname"];
    vCard.organization = this.profiledetails["companyname"];
    vCard.photo.attachFromUrl(this.profiledetails["profilepic"], "JPEG");
    vCard.workPhone = this.profiledetails["primarycontact"];
    vCard.title = this.profiledetails["designation"];
    vCard.workAddress = this.profiledetails["address"];
    vCard.email = this.profiledetails["primaryemail"];
    const content = encodeURI(vCard.getFormattedString());
    const dl = document.createElement("a");
    dl.setAttribute("href", "data:text/x-vcard;charset=utf-8," + content);
    dl.setAttribute("download", vCard.firstName + ".vcf");
    dl.click();
  }
}
