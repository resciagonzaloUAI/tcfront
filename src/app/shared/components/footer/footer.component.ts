import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
}
