import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface PromotionRequestEmailProps {
  businessName?: string
  contactPerson?: string
  email?: string
  phone?: string
  productOrService?: string
  promotionType?: string
  campaignDescription?: string
  link?: string
  budgetInfo?: string
  preferredContact?: string
  additionalInfo?: string
  timestamp?: string
}

const label: React.CSSProperties = {
  color: '#6B7280',
  fontSize: 12,
  letterSpacing: 1,
  textTransform: 'uppercase',
  margin: '0 0 2px 0',
}

const value: React.CSSProperties = {
  color: '#111827',
  fontSize: 15,
  margin: '0 0 14px 0',
  whiteSpace: 'pre-wrap',
}

function Field({ name, val }: { name: string; val?: string | undefined }) {
  if (!val) return null
  return (
    <Section>
      <Text style={label}>{name}</Text>
      <Text style={value}>{val}</Text>
    </Section>
  )
}

export function PromotionRequestEmail(props: PromotionRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New Saris TV Promotion Request — ${props.businessName ?? 'Unknown'}`}</Preview>
      <Body style={{ backgroundColor: '#F3F4F6', fontFamily: 'Inter, Arial, sans-serif' }}>
        <Container
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            margin: '32px auto',
            padding: '32px',
            maxWidth: 560,
          }}
        >
          <Heading style={{ color: '#002B9E', fontSize: 22, margin: '0 0 4px 0' }}>
            New Promotion Request
          </Heading>
          <Text style={{ color: '#6B7280', fontSize: 13, margin: '0 0 20px 0' }}>
            Submitted via the Saris TV website
          </Text>
          <Hr style={{ borderColor: '#F7B201', borderWidth: 2, margin: '0 0 20px 0' }} />

          <Field name="Business / Brand Name" val={props.businessName} />
          <Field name="Contact Person" val={props.contactPerson} />
          <Field name="Email" val={props.email} />
          <Field name="Phone" val={props.phone} />
          <Field name="Product / Service" val={props.productOrService} />
          <Field name="Promotion Type" val={props.promotionType} />
          <Field name="Campaign Description" val={props.campaignDescription} />
          <Field name="Website / Link" val={props.link} />
          <Field name="Budget / Campaign Information" val={props.budgetInfo} />
          <Field name="Preferred Contact Method" val={props.preferredContact} />
          <Field name="Additional Info" val={props.additionalInfo} />
          <Field name="Timestamp" val={props.timestamp} />

          <Hr style={{ borderColor: '#E5E7EB', margin: '8px 0 16px 0' }} />
          <Text style={{ color: '#9CA3AF', fontSize: 12, margin: 0 }}>
            Saris TV — sarismultimedia.com · Reply directly to this email to reach the customer.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: PromotionRequestEmail,
  subject: (d: Record<string, any>) =>
    `New Saris TV Promotion Request — ${d['businessName'] ?? 'Unknown'}`,
  displayName: 'Promotion Request Notification',
  to: 'saristvethiopia@gmail.com',
  previewData: {
    businessName: 'Sheba Coffee Export',
    contactPerson: 'Hanna Tesfaye',
    email: 'hanna@shebacoffee.com',
    phone: '+251911234567',
    productOrService: 'Premium Ethiopian coffee beans',
    promotionType: 'Sponsored Review',
    campaignDescription: 'We would like a featured review of our new export line.',
    link: 'https://shebacoffee.example.com',
    budgetInfo: 'Around 50,000 ETB for a two-week campaign',
    preferredContact: 'Email',
    additionalInfo: 'Launching in September.',
    timestamp: new Date().toISOString(),
  } satisfies PromotionRequestEmailProps,
} satisfies TemplateEntry
