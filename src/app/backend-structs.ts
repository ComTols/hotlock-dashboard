export interface School {
    id: string
    name: string
    adresse: string
    kuerzel: string
}

export interface DashboardTile {
    size: {
        col: number
        row: number
    }
    position: {
        col: number
        row: number
    }
    options: {
        type: string
        title: string
        yAxis: {
            unit: string,
            title: string
        }
        xAxis: {
            categories: string[]
            title: string
        }
    }
}