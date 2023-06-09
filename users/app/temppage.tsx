// app/page.tsx
'use client'
import { useExploreProfiles } from '@lens-protocol/react-web'
import Link from 'next/link'
import { formatPicture } from '../utils'
import { ExploreProfilesRequest ,ExploreProfilesDocument} from '@/generated'
import { apolloClient } from '@/appolo'

// export default function Home() {
//   const { data } = useExploreProfiles({
//     limit: 25
//   })






export const exploreProfiles = async (request: ExploreProfilesRequest) => {
    const result = await apolloClient.query({
        query: ExploreProfilesDocument,
        variables: {
            request,
        },
    });

    return result.data.exploreProfiles;
};


export default function Home() {
    // const { data } = useExploreProfiles({
    //     limit: 25
    // })


    return (
        <div className='p-20'>
            <h1 className='text-5xl'>My Lens App</h1>
            {
               
                exploreProfiles?.map((profile, index) => (
                    <Link href={`/profile/${profile.handle}`} key={index}>
                        <div className='my-14'>
                            {
                                profile.picture && profile.picture.__typename === 'MediaSet' ? (
                                    <img
                                        src={formatPicture(profile.picture)}
                                        width="120"
                                        height="120"
                                        alt={profile.handle}
                                    />
                                ) : <div className="w-14 h-14 bg-slate-500	" />
                            }
                            <h3 className="text-3xl my-4">{profile.handle}</h3>
                            <p className="text-xl">{profile.bio}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
