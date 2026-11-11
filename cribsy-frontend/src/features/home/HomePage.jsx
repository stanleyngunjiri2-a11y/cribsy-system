// OWNER: Member 2 - Alex. Public landing page.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import { formatKES } from '../../utils/format'
import { benefits, featuredProperties, steps } from './homeData'