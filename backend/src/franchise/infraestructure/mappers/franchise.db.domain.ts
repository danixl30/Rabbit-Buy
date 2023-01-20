import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseImage } from 'src/franchise/domain/value-objects/franchise.image'
import { FranchiseName } from 'src/franchise/domain/value-objects/franchise.name'
import { FranchiseRif } from 'src/franchise/domain/value-objects/franchise.rif'
import { FranchiseDocument } from '../models/franchise.model'

export const franchiseDbToDomain = (franchise: FranchiseDocument): Franchise =>
    Franchise.create(
        FranchiseId.create(franchise.id),
        FranchiseName.create(franchise.name),
        FranchiseRif.create(franchise.rif),
        FranchiseGroupId.create(franchise.groupId),
        FranchiseImage.create(franchise.image),
    )
