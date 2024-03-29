import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  dataSource = new Array();
  attribs = {};
  taskList = ['measure', 'check'];
  isEdit = false;

  id: string;
  taskForm: FormGroup;
  nameControl: any;
  repetitionControl: any;
  typeControl: any;
  num_of_attribControl: any;
  PictureControl: any;
  taskDetail: any;
  constructor(
    private apiService: ApiService,
    private cmnService: CmnServiceService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.aRoute.snapshot.params?.id;
  }

  attrib_names = new FormGroup({});

  ngOnInit(): void {
    // this.getTaskData();

    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      num_of_attrib: new FormControl(''),
      req_image: new FormControl('', Validators.required),
    });
    this.nameControl = this.taskForm.get('name');
    this.repetitionControl = this.taskForm.get('frequency');
    this.typeControl = this.taskForm.get('type');
    this.num_of_attribControl = this.taskForm.get('num_of_attrib');
    this.PictureControl = this.taskForm.get('req_image');

    this.aRoute.queryParams.subscribe((res: any) => {
      this.taskDetail = res;
      console.log('Task detail :- ', this.taskDetail);
      this.nameControl.setValue(res?.name);
      this.repetitionControl.setValue(res?.frequency);
      this.typeControl.setValue(res?.type);
      this.num_of_attribControl.setValue(res?.num_of_attrib);
      this.PictureControl.setValue(res?.req_image == '1');
      if (Number(res?.num_of_attrib) > 0) {
        for (let i = 1; i <= Number(res?.num_of_attrib); i++) {
          let attributeNames = this.taskDetail?.attrib_names.replace(/'/g, '"');

          if (this.id) {
            this.attrib_names.addControl(
              `attrib_name_${i}`,
              new FormControl(
                JSON.parse(attributeNames)[`attrib_name_${i}`],
                Validators.required
              )
            );
          } else {
            this.attrib_names.addControl(
              `attrib_name_${i}`,
              new FormControl('', Validators.required)
            );
          }

          this.dataSource.push(i);
        }
      } else {
      }
      this.numEntered();
    });

    this.taskForm.controls?.type.valueChanges.subscribe((type: string) => {
      if (type == 'measure') {
        this.taskForm.controls.type.setValidators([Validators.required]);
      } else {
        this.taskForm.controls.type.setValidators([]);
      }
    });

    if (this.id) {
      this.isEdit = true;

      // get task detail of particular id here and set value

      // this.apiService.getTaskData().subscribe((res) => {
      //   this.nameControl.setValue(res[this.editId].name);
      //   this.repetitionControl.setValue(res[this.editId].frequency);
      //   this.typeControl.setValue(res[this.editId].type);
      //   this.num_of_attribControl.setValue(res[this.editId].num_of_attrib);
      // });
    } else {
      this.isEdit = false;
    }
  }

  ngAfterViewInit() {
    this.numEntered();
  }

  numEntered() {
    this.taskForm
      .get('num_of_attrib')
      ?.valueChanges.subscribe((res: number) => {
        this.dataSource = new Array();
        if (res > 0) {
          for (let i = 1; i <= res; i++) {
            if (this.id) {
              this.attrib_names.addControl(
                `attrib_name_${i}`,
                new FormControl(
                  this.taskDetail?.attrib_names[`attrib_name_${i}`],
                  Validators.required
                )
              );
            } else {
              this.attrib_names.addControl(
                `attrib_name_${i}`,
                new FormControl('', Validators.required)
              );
            }

            this.dataSource.push(i);
          }
        } else {
        }
      });
  }

  onSubmit() {
    this.cmnService.showLoader();
    if (this.taskForm.valid) {
      if (this.isEdit == true) {
        let combined = {
          ...this.taskForm.value,
          attrib_names: { ...this.attrib_names.value },
        };
        this.apiService.editTaskData(combined, this.id).subscribe((res) => {
          this.cmnService.hideLoader();
          this.router.navigateByUrl('admin/task-management');
          this.toastr.success('Task saved successfully');
        }),
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
          };
        // this.taskForm.reset();
      } else {
        let combined = {
          ...this.taskForm.value,
          attrib_names: { ...this.attrib_names.value },
        };
        console.log('Task :- ', combined);
        this.apiService.createTask(combined).subscribe((res: any) => {
          this.cmnService.hideLoader();
          this.toastr.success('Task added successfully');
          this.taskForm.reset();
        }),
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
          };
      }
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
