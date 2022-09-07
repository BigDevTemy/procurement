
function switchComponentBodyRender(tab_name){
    
    switch(tab_name){
        case 'Add Requisition':
            return AddRequisition();
            break;
        case 'All Requisition':
            return AllRequisition();
        case 'Add Supplier':
            return AddSupplier();
        case 'Add Abroad/Local Clearing':
            return AddAbroadAgent();
        case 'All Supplier':
            return AllSupplier();
            case 'All Agent':
                return AllAgent();
        case 'Add Project':
            return AddProject();
        case 'All Project':
            return AllProject();
        case 'Add Order':
             return AddOrder();
        case 'All Order':
            return AllOrder();
        case 'Treated Approval':
            return TreatedApproval();
        case 'Pending Approval':
            return PendingApproval();
        case 'Pending with the supplier':
            return AwaitingShippment();
        case 'Dispatched':
            return Dispatched();
        case 'Package Received by Agent':
            return Package();
        case 'Shipped By Agent':
            return Shipped();
        case 'Delivered':
            return Delivered();
        case 'Pending PO Approval':
            return POPendingClicked();
        case 'PO Approved':
            return POApproved();
        case 'Approval Report':
            return ApprovedReportClick();
        case 'PO Report':
            return POReportClick();
        case 'Shippment Report':
            return ShippmentReportClick();
        case 'Requisition Report':
            return RequisitionReportClick();
        default:
            
    }
}


