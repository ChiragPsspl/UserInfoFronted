import {Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Service/config.service';
import { MatSort,Sort } from '@angular/material/sort';


@Component({
  selector: 'app-loginlist',
  templateUrl: './loginlist.component.html',
  styleUrls: ['./loginlist.component.css']
})
export class LoginlistComponent {


  lstUser : Element[] = [];
  displayedColumns: string[] = ['srNo', 'userName', 'isLogin'];
  dataSource : any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private config: ConfigService, private router: Router){

    }
  
    ngOnInit(){
      this.GetAllUserInformation();   
    }
  
    GetAllUserInformation() {
      debugger;
      const methodName = "LogInfo/GetAll";
      const methodType = "Get";
  
      this.config.GetData(methodName, methodType).
          subscribe((data)=> 
          {
             this.lstUser = data;
            console.log(this.lstUser?.length);
            
            this.dataSource = new MatTableDataSource<Element>(this.lstUser);
            for(let i = 0; i < this.dataSource.filteredData.length;i++){
              if(this.dataSource.filteredData[i].isLogin){
                this.dataSource.filteredData[i].isLogin = "Yes";
              }
              else{
                this.dataSource.filteredData[i].isLogin = "No";
              }
              this.dataSource.filteredData[i].srNo = i+1;
            }

            this.dataSource.paginator = this.paginator;

            this.dataSource.sort = this.sort;
          }); 
    }

    
  ngAfterViewInit() {
    debugger;
    //this.dataSource.paginator = this.paginator;
  }

  LogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/','login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // const tableFilters = [];
    // tableFilters.push({
    //   id: 'userName',
    //   value: filterValue
    // });
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.filter = JSON.stringify(tableFilters);
  }
}


export interface Element {
  userName: string;
  emailId: number;
  isLogin: string;
  srNo: number;
}
