export interface School {
    id: string
    name: string
    adresse: string
    kuerzel: string
}

export interface DashboardTile {
    size?: {
        col: number
        row: number
    }
    position?: {
        col: number
        row: number
    }
    options: {
        type: string
        title?: string
        yAxis?: {
            unit?: string,
            title?: string
        }
        yAxis2?: {
            unit?: string,
            title?: string
        }
        xAxis?: {
            categories?: string[]
            title?: string
        }
        requestKey: "usage" | "expenditure"
    }
}

export interface Answer {
    access: boolean
    content: any
    error: string[]
    msg: string
    token: string
}

export interface GetSchoolsAnswer extends Answer {
    content: School[]
}

export interface GetSchoolAnswer extends Answer {
    content: School
}

export interface GetGebaeudeAnswer extends Answer {
    content: Gebaeude[]
}

export interface GetEtageAnswer extends Answer {
    content: Etage[]
}

export interface GetRoomsAnswer extends Answer {
    content: Room[]
}

export interface School {
    adresse: string,
    id: string,
    kuerzel: string,
    name: string
}

export interface Gebaeude {
    id: string,
    name: string,
    school: string
}

export interface Etage {
    etage: number,
    gebaeude: string,
    id: string
}

export interface Room {
    etage: string,
    id: string,
    nr: string,
    solltemp: number,
    type: string
}
