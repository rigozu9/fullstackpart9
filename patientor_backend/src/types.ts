export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// export type NonSensitiveDiagnosis = Omit<Diagnosis, 'latin'>;