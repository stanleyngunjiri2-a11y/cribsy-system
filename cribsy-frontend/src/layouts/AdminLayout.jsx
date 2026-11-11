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
        <>
        <PageHeading title="Admin dashboard" description= "An overwiew of users and listings."/>
        <SampleDataNotice />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s)=> (
                <div key = {s.label} className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-sm texte-slate-600"> {s.label}</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-800"> {s.value}</p>
                    </div>
         ))}
        </div>
        </>
    )
}