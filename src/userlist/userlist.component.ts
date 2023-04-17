import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Service/config.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInput } from '@angular/material/input';


export interface UserElement {
  userName: string;
  srNo: number;
  emailId: number;
  address: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {

  lstUser : UserElement[] = [];
  displayedColumns: string[] = ['srNo', 'userName', 'emailId', 'address'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  order: string = '';
  constructor(private config: ConfigService, private router: Router){

  }

  ngOnInit(){
    this.GetAllUserInformation();   
  }

  // applyFilter(event: Event) {
  //   debugger;
  //   console.log(event);
  //   const target = event.target as HTMLInputElement;

  //   //this.dataSource.filteredData.filter(target.value);
  //   this.dataSource.filter = target.value;
  //   console.log(this.dataSource.filteredData.filter);
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  GetAllUserInformation() {
    debugger;
    const methodName = "UserRegistration/GetAll";
    const methodType = "Get";

    this.config.GetData(methodName, methodType).
        subscribe((data)=> 
        {
           this.lstUser = data;
          
          console.log(this.lstUser?.length);
          this.dataSource = new MatTableDataSource<UserElement>(this.lstUser);

          for(let i = 0; i < this.dataSource.filteredData.length;i++){
            this.dataSource.filteredData[i].srNo = i+1;
          }

          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;

        }); 
  }

  CreateNew(){
    this.router.navigate(['/', 'register']);
  }
  LogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/','login']);
  }

  sortByCol(name: string) {
   debugger;
   
    if(this.dataSource.filteredData.length > 0 ) {
      if(this.dataSource.filteredData.indexOf(name) !== -1){
        console.log('alreday includes name');
        this.dataSource.filteredData.pop();
      }else {
        console.log('not  includes name');
        this.dataSource.filteredData.push(name);
      }
    } else {
      this.dataSource.filteredData.push(name);
    }

    this.order = this.dataSource.filteredData.join();
    //this.order = this.dataSource.join();
   // this.orderBy.transform(this.ELEMENT_DATA, this.order);
    //console.log(name, this.order);
  }

  ngAfterViewInit() {
    debugger;
    // this.empTbSort.disableClear = true;
    // this.dataSource.filteredData.sort = this.empTbSort;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
