import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseName } from 'src/franchise/domain/value-objects/franchise.name'
import { FranchiseRif } from 'src/franchise/domain/value-objects/franchise.rif'
import { FranchiseDocument } from '../models/franchise.model'

export const franchiseDbToDomain = (franchise: FranchiseDocument): Franchise =>
    new Franchise(
        new FranchiseId(franchise.id),
        new FranchiseName(franchise.name),
        new FranchiseRif(franchise.rif),
        new FranchiseGroupId(franchise.groupId),
    )
