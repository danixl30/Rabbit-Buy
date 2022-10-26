import { Dicctionary } from '../../../../../utils/types/dicctionary'
import { RequestConfiguration } from './request-configuration'

export type RequestConfigurationFile<T> = RequestConfiguration<T> & {
    files: Dicctionary<File>
}
