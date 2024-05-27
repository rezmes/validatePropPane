import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IListInfoWebPartProps {
    description: string;
    listName: string;
}
export default class ListInfoWebPart extends BaseClientSideWebPart<IListInfoWebPartProps> {
    render(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private validateDescription(value);
    private validateListName(value);
}
