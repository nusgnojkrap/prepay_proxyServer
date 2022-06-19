import { Socket } from "net";
import { getAccept, getContact, getIp, getTag, getTwoH, responser } from "../utils/string";
import { SessionVO } from "../vo/sessionVO";
import { SipVO } from "../vo/sipVO";

export async function optService(sip : SipVO, session: SessionVO) : Promise<void> {
    // options 받은 것을 허락하기 위해 200OK 를 날린다.
    let twoh = getTwoH()
    let via = 'Via:' + sip.via + 'received=' + getIp()
    let from = 'From:' + sip.from
    let to  = 'To:' + sip.to + ';tag=' + getTag()
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let server = 'Server: Junho PBX'
    let allow = 'Allow:' + sip.allow
    let supported = 'Supported:' + sip.supported
    let contact = 'Contact: '+ getContact();
    let accept = 'Accept: ' + getAccept();
    let context_length = 'Content-Length: 0'

    let response = responser([twoh, via, from, to, call_id, cseq, server, allow, supported, contact, accept, context_length])
    await session.write(response)
}