import { ScopeObject, app } from "../interfaces/app"

app.helper<UtilHelper>('UtilHelper',(
    $scope: ScopeObject<UtilHelperScope>
)=>{
    const isNotNull = (value) => {
        if (value===null) {
            throw new Error('invalid date value')
        }
    }
    $scope.UtilHelper = {
        date: {
            toReadable:(date)=>{
                isNotNull(date)
                // @ts-ignore
                return moment(date).format('LLLL')
            },
            toISOFormat:(date)=>{
                isNotNull(date)
                // @ts-ignore
                return moment(date).format()
            },
            toTimeAgo:(date)=>{
                isNotNull(date)
                // @ts-ignore
                return moment(date).fromNow()
            }
        },
        names: {
            getFirstLetter:(name)=>{
                return name[0].toUpperCase()
            }
        }
    }

    return {}
})


type unit = ' ' | 'Billion' | 'Million' | 'Thousand' | 'Trillion'

type DateUtilServices = {
    toReadable:(date:string|number)=>string,
    toISOFormat:(date:string|number)=>string,
    toTimeAgo:(date:string|number)=>string
}

type NamesService = {
    getFirstLetter:(name:string)=>string
}

type UtilHelperScope = {
    UtilHelper: {
        date: DateUtilServices
        names: NamesService
    }
}

export interface UtilHelper {
}