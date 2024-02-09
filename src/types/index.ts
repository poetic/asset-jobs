export type JobListing = {
  absolute_url: string;
  content: string;
  data_compliance: {
    requires_consent: boolean;
    requires_processing_consent: boolean;
    requires_retention_consent: boolean;
    retention_period: string | null;
    type: string;
  }[];
  departments: {
    child_ids: number[];
    id: number;
    name: string;
    parent_id: number | null;
  }[];
  education: string | null;
  id: number;
  internal_job_id: number;
  location: { name: string };
  metadata: { id: number; name: string; value: string; value_type: string }[];
  offices: {
    child_ids: number[];
    id: number;
    location: string | null;
    name: string;
    parent_id: number | null;
  }[];
  title: string;
  updated_at: string;
};
