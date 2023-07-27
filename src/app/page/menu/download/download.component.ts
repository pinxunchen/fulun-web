import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface LinkItem {
  label: string;
  url: string;
}

interface MenuItem {
  name: string;
  links: LinkItem[];
}


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})


export class DownloadComponent {
  constructor(private router: Router) {}
  menus: MenuItem[] = [
    {
      name: '福倫文件',
      links: [
        { label: '福倫小簽單', url: 'https://drive.google.com/file/d/13_UMfnUSXdAo7splSo_RoVYOYcTjokXM/view?usp=drive_link' },
        { label: '首次切結書', url: 'https://drive.google.com/file/d/1pp2UH3tUKPOBN8hBdyiQM4E5WF-znEnL/view?usp=drive_link' },
      ]
    },
    {
      name: '台北',
      links: [
        { label: '租賃紀錄表 - 履帶', url: 'https://drive.google.com/file/d/1oTPoc_pK5F_If6_-5jGMP1zKXyhe75U1/view?usp=drive_link' },
        { label: '租賃紀錄表 - 撐桿', url: 'https://drive.google.com/file/d/1tZNKUzS1HeFc3A5oejKA-Q3nkuv2bDIR/view?usp=drive_link' },
        { label: '購買證明', url: 'https://drive.google.com/file/d/1xC2YXB-D2QVyCrnbz4ordpH3ZjAP1R4c/view?usp=drive_link' },
        { label: '交通出勤報表', url: 'https://drive.google.com/file/d/1t_9gLWtI8cT5RM18-vZeX1XZFkdhGjHs/view?usp=drive_link' },
        { label: '收據黏貼表', url: 'https://drive.google.com/file/d/1zPhuSbODhp4NmgNbrLdnNGu_ZO_8T5j2/view?usp=drive_link' },
        { label: '風險同意書(民眾)', url: 'https://drive.google.com/file/d/1XxUVbfjBfFTHGx2WAZiPi_aiJjETXc-J/view?usp=drive_link' },
      ]
    },
    {
      name: '桃園',
      links: [
        { label: '服務租賃請款表', url: 'https://drive.google.com/file/d/1k93fN5oUXULBdxUg3U5YrFiIeNDax4CW/view?usp=drive_link' },
        { label: '租賃紀錄表', url: 'https://drive.google.com/file/d/12JRd7AyptjrfW2COWB9LugZPa5ItTy6n/view?usp=drive_link' },
      ]
    },
    {
      name: '基隆',
      links: [
        { label: '服務租賃紀錄表', url: 'https://drive.google.com/file/d/1U4ThBZSXdJNvuvU_pb9pw9mm8cOzQKvG/view?usp=drive_link' },
        { label: '輔具購買補助證明', url: 'https://drive.google.com/file/d/14s7bWVD13cWlp7fY7sCNBcNkkdgCgoFD/view?usp=drive_link' },
        { label: '個案契約書', url: 'https://drive.google.com/file/d/1LhR5mvsPUM7WRM5o9OZ9tmMLgHq589Td/view?usp=drive_link' },
        { label: '輔具照片', url: 'https://drive.google.com/file/d/1Yjlz-v-LlAXKne6LSk0aJPa3Ehn2cZSY/view?usp=drive_link' },
      ]
    },

  ];

  activeMenu: string | null = null;

  toggleMenu(menuName: string): void {
    this.activeMenu = this.activeMenu === menuName ? null : menuName;
  }

  navigateToQuotaSearch(): void {
    this.router.navigateByUrl('menu/quota/quota-search');
  }
}
