export class DocumentItem {
  id: string;
  name: string;
  documentSourceId: string;
  documentSource: string;
  documentType: string;
  parentName: string;
  parentId: string;

  
  version: number;
  createdBy: string;
  createdDate: Date;
  lastModifiedDate: Date;
  
  externalId: string;
  externalParentId: string;
  externalParentName: string;
  
}
