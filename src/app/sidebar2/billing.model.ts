export interface Subchild {
    name: string;
    icon: string;
    isActive:boolean;
    menuId:number;
    IDs:string;
    Type:string;
    isVisible:boolean;
    value:string;
}

export interface Child {
    name: string;
    icon: string;
    isActive:boolean;
    menuId:number;
    IDs:string;
    Type:string;
    isVisible:boolean;
    value:string;
    subchild: Subchild[];
}

export interface menulist1 {
    name: string;
    icon: string;
    isActive:boolean;
    menuId:number;
    IDs:string;
    Type:string;
    isVisible:boolean;
    value:string;
    children: Child[];
}
