import PageHeading from '../../componenets/shared/PageHeading'
import SampleDataNotice from '../../componenets/shared/SampleDataNotice'
import {adminProperties, adminUsers} from './adminData'

function AdminDashboardPage(){
    const stats = [
        {label: 'Total users', value: adminUsers.length},
        {label:'Landlords', value: adminUsers.filter((u) => u.role === 'Landlord').length},
        {label: 'Tenant', value: adminUsers.filter((u) => u.role ==='Tenant').length},
        {label: 'Properties awaiting approval', value: adminPropereties.filter((p) => p.approval === 'Pending').length},
    ]
    return(
        <PageHeading title="Admin dashboard" description= "An overwiew of users and listings."/>
        <SampleDataNotice/>
        
    )
}