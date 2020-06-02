export class DocumentItem {
  id: string;
  name: string;
  documentSourceId: string;
  documentSource: string;
  documentType: string;
  parentName: string;
  parentId: string;

  file: any[];
  
  version: number;
  createdBy: string;
  createdDate: Date;
  lastModifiedDate: Date;
  
  externalId: string;
  externalParentId: string;
  externalParentName: string;
  
}
