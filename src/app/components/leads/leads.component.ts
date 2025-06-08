import { Component } from '@angular/core';

@Component({
  selector: 'app-leads',
  standalone: false,
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {
  leadViews: string[] = [
    'All Leads',
    'All Locked Leads',
    'Converted Leads',
    'Junk Leads',
    'Mailing Labels',
    'My Converted Leads',
    'My Leads',
    'Not Qualified Leads',
    'Open Leads',
    'Recently Created Leads',
    'Recently Modified Leads',
    "Today's Leads",
    'Unread Leads',
    'Unsubscribed Leads'
  ];

  systemFilters: string[] = [
    'Touched Records', 'Untouched Records', 'Record Action',
    'Related Records Action', 'Locked', 'Email Sentiment',
    'Latest Email Status', 'Activities', 'Campaigns', 'Cadences'
  ];

  fieldFilters: string[] = [
    'Annual Revenue', 'City', 'Company',
    'Converted Account', 'Converted Contact', 'Converted Deal'
  ];

  searchText: string = '';
  filteredLeadViews: string[] = [];
  selectedLeadView: string = 'All Leads';

  filterPanelVisible: boolean = true;
  filterSearch: string = '';
  showSystemFilters: boolean = true;
  showFieldFilters: boolean = true;

  filterValues: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.filteredLeadViews = [...this.leadViews];
  }

  filterDropdown(): void {
    const filter = this.searchText.toLowerCase();
    this.filteredLeadViews = this.leadViews.filter(view =>
      view.toLowerCase().includes(filter)
    );
  }

  selectView(view: string): void {
    this.selectedLeadView = view;
  }

  toggleFilterPanel() {
    this.filterPanelVisible = !this.filterPanelVisible;
  }

  toggleSection(section: 'system' | 'fields') {
    if (section === 'system') {
      this.showSystemFilters = !this.showSystemFilters;
    } else {
      this.showFieldFilters = !this.showFieldFilters;
    }
  }
}
