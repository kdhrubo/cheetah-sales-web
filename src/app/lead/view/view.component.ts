import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';
import { Lead } from 'src/app/models/lead.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  lead: Lead;

  constructor(private route: ActivatedRoute,
              private leadService: LeadService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.leadService.findOne(id)
      .subscribe(
        data => {
          this.lead = data;
        },
        error => {
          console.log('Unable to retrieve lead details');
        }

      );
  }

}
